+++
date = '2026-07-10T13:52:40+08:00'
title = '切换系统到 Debian 13'
categories = ["技术"]
tags = ["系统"]

+++


最近把自己的主力机换个系统，换到 Debian 上了。

之前桌面环境用的 Xfce, 在虚拟机里面运行算流畅就自信迁移，把主力 Windows 换成 Linux 了。

## 第一个坑
我在 Windows 中用某全自动迁移程序，结果给我选了个速度在广东一坨的某商业云镜像站。后来我把 Batch File 改成南科大的镜像站（离我最近）

某大厂怎么软件源速度这么能这么慢啊...

## 第二个坑
我在用的是笔记本电脑，屏幕亮度的调节是很重要的。但是发现进入配置文件，不能调节亮度，用 `blight` 这类命令也不行。看看显卡：
```
INSTALL 00:01.0 VGA compatible controller: Advanced Micro Devices, Inc. [AMD/ATI] Kaveri [Radeon R6 Graphics]
```
```shell
╭─linserin@debian ~ 
╰─$ xrandr --listproviders

Providers: number : 1
Provider 0: id: 0x55 cap: 0xf, Source Output, Sink Output, Source Offload, Sink Offload crtcs: 4 outputs: 3 associated providers: 0 name:KAVERI @ pci:0000:00:01.0
```
没错，我没有安装驱动。
- - -
## 第三
这个估计不算是坑。

在安装一个不知名软件包时，不知道什么情况，一个 `mv` 命令把 ` /usr/lib` 和 `/usr/share` 给整消失了，Xfce 桌面崩了，然后重启时 dbus 一堆服务启动失败。虽然系统能进去，但是 apt 和 Xfce 等软件全都不正常工作。

于是我进去 Recovery Mode, 连接互联网，想 `chroot`  进去用 `dpkg` 一类工具修补，但是由于链接库都没了所以说 ` apt`  报错。好在 rescue 里，网络能使用。于是我和就 ChatGPT 切磋半天，一个一个包 ` wget`  下来。弄到一半发现 `dpkg -S`  下来起码上百个包。

够我折腾了，果断放弃，把 `linux` 和 ` initrd.gz` 从镜像站下过来然后进 GRUB 命令行启动 netinst 了

# 感受
![](/img/switch-to-debian/mem.jpg)
换下来其实也不是很大坑。相比之前的 Windows 10 开机时长也差不多。但是 Xfce 的占有内存占用真的挺少。而且就算我开着个 VS Code 也就占据了 2.2 G，非常适合我。

以及，虽然我基本不使用 node.js, Debian 13 的软件源似乎 node 版本只能装到 20（虽然我知道可以靠改 source 或者 `nvm` 命令来安装），让我有点惊讶。
![](/img/switch-to-debian/apt-node.jpg)
>引用图片：北京外国语大学开源软件镜像站 / https://mirrors.bfsu.edu.cn/debian/pool/main/n/nodejs/

- - -

Update: 稳定性堪忧，AMD 的驱动时不时就掉
- - -
Update 2: 我收回前面的话，稳定性还不错; 但是每一次启动都要重新用 `blight` 设置亮度（
