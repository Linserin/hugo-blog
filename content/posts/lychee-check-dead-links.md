+++
date = '2026-07-04T01:44:50Z'
title = '通过 lychee 检查网站与 Markdown 文件的死链'
categories = ["技术"]
tags = ["工具"]
+++

通过 lychee 检查无法访问的链接。
# 介绍
[lychee](https://github.com/lycheeverse/lychee) 是一个实用工具，帮助轻松检查页面的死链。其不仅具有易懂的 TUI 界面，还能将结果输出为 JSON 格式。
# 安装

在大部分包管理器的软件源中都包含了 lychee 软件包。

For Debian:
```shell
su root
apt update
apt install lychee
```
如果包管理器的软件源没有 lychee,可前往 [GitHub Release](https://github.com/lycheeverse/lychee/releases) 下载

# 使用
通常，其命令参数接检查的页面即可。

例如:
```shell
lychee https://linserin.work/posts
```
其输出为:
```shell
╭─u0_a724@localhost /sdcard/Hugo
╰─$ lychee https://linserin.work/posts
42/42 ━━━━━━━━━━━━━━━━━━━━ Finished extracting links                                    🔍 42 Total (in 3s 51ms) 🔗 31 Unique ✅ 42 OK 🚫 0 Errors 🔀 3 Redirects

Hint: Followed 3 redirects. You might want to consider replacing redirecting URLs with the resolved URLs. Use verbose mode (`-v`/`-vv`) to see redirection details.
```

如果在 Termux 上，可能需要接 `--insecure`.
# 检查 Markdown 文件
是的，lychee还能够检查 Markdown 文件的死链，以及检查远程 Markdown 文件的死链。
## 检查当前目录下的 Markdown
lychee 将检查目录中的无法访问的图片，链接等内容。

使用方法:
```shell
lychee .
```
## 检查远程 Markdown 文件
```shell
lychee https://raw.githubusercontent.com/lycheeverse/lychee/master/README.md
```
## 调用
lychee 可以输出为 JSON，进行 `subprocess` 式调用。

详细请查看命令行用法。
# 参考
lychee: [GitHub](https://github.com/lycheeverse/lychee) | [文档](https://lychee.cli.rs/guides/getting-started/#usage)