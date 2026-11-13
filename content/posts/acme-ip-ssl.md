+++
date = '2026-11-13T22:21:20+08:00'
title = '通过 acme.sh 和 Nginx 来为 IP 颁发证书'
categories = ["技术"]
tags = ["SSL","acme","证书"]
+++

让 IP 也拥有一个 SSL 证书！

## Before we start...
通过 HTTP 直接连接 IP 不安全，易被中间人攻击。但是我们可以利用起强大的密码学以及现有基础设施。

通过 [Let's Encrypt](https://letsencrypt.org/) 签发的证书的有效期通常很短。但是通过 Cron 任务可以自动续期，确保证书始终有效。

## 安装
```bash
curl https://raw.githubusercontent.com/acmesh-official/acme.sh/master/acme.sh -o /tmp/acme.sh
cd /tmp
chmod +x ./acme.sh
./acme.sh  --install
rm ./acme.sh
```

## 开放端口
为了验证这个 IP 由本人持有， acme.sh 需要通过 HTTP-01 验证方式来验证域名所有权。因此，确保 TCP 80 和 TCP / UDP 443 端口在公网可以访问。

## 配置一个 Nginx 文件服务器
```bash
mkdir -p /var/www/letsencrypt
mkdir -p /etc/nginx/ssl
```
覆盖: `/etc/nginx/sites-available/default` 以此 [配置文件](https://paste.linserin.work/gcnwclak) / 来自 [烧饼博客](https://u.sb/acme-sh-ip-ssl/#pei-zhi-nginx-80-duan-kou-de-mo-ren-zhan-dian)。

此操作是通过 acme.sh 的 HTTP-01 验证方式，Let's Encrypt 通过此处打开的文件服务器来验证你对该 IP 的所有权。

## 颁发证书
此操作可能需要使用 root 权限，或者使用 sudo.

如果遇到
```
It seems that you are using sudo, please read this page first:
https://github.com/acmesh-official/acme.sh/wiki/sudo
```
可以尝试 `--force` 参数。
- - -
```bash
acme.sh --issue --server letsencrypt -d 1**.1**.2**.**3 -w /var/www/letsencrypt --certificate-profile shortlived  --days 4
```
将上方脱敏的 IP 替换为你自己的公网 IP 地址。

看到如下方通常为成功
```
[Mon Nov 13 22:21:20 CST 2026] Your cert is in  /root/.acme.sh/1**.1**.2**.**3/1**.1**.2**.**3.cer
[Mon Nov 13 22:21:20 CST 2026] Your cert key is in  /root/.acme.sh/1**.1**.2**.**3/1**.1**.2**.**3.key
[Mon Nov 13 22:21:20 CST 2026] The intermediate CA cert is in  /root/.acme.sh/1**.1**.2**.**3/ca.cer
[Mon Nov 13 22:21:20 CST 2026] And the full chain certs is there:  /root/.acme.sh/1**.1**.2**.**3/fullchain.cer
```

## 排障
```
Unknown parameter: --certificate-profile
```
使用 `acme.sh --upgrade` 来升级 acme.sh 到最新版本或者使用上文的安装方法重新安装。

## 安装证书
```bash
mkdir -p /etc/nginx/ssl

acme.sh --install-cert -d 192.0.2.2 \
  --key-file       /etc/nginx/ssl/ip.key  \
  --fullchain-file /etc/nginx/ssl/ip.crt \
  --ca-file        /etc/nginx/ssl/ip.ca.crt \
  --reloadcmd     "systemctl restart nginx"
```
遇到 `Permission denied` 请使用 root 权限或者 sudo 来执行。

接下来配置好其余站点即可：
```nginx
    ssl_certificate /etc/nginx/ssl/ip.crt;
    ssl_certificate_key /etc/nginx/ssl/ip.key;
```
并且配置好 HTTP - - > HTTPS 重定向（推荐）

## Reference
- [烧饼博客 - Showfom](https://be.st/kQJK)