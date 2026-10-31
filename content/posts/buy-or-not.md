+++
date = '2026-08-19T12:53:25+08:00'
title = '买还是不买'
categories = ["杂谈"]
tags = ["无标签"]
+++

都在说最近数码产品价格（笔记本）价格居高不下，我不禁看向手里抱着的这台笔记本

```shell
╭─linserin@debian ~/Desktop/Hugo 
╰─$ fastfetch -l none
linserin@debian
---------------
OS: Debian GNU/Linux 13.6 (trixie) x86_64
Host: Inspiron 5545 (A02)
Kernel: Linux 6.12.95+deb13-amd64
Uptime: 52 mins
Packages: 2142 (dpkg)
Shell: zsh 5.9
Display (CMN15BF): 1366x768 in 16", 60 Hz
DE: Xfce4 4.20
WM: Xfwm4 (X11)
WM Theme: Default
Theme: Qogir-Dark [GTK2/3/4]
Icons: Qogir-Manjaro-Dark [GTK2/3/4]
Font: Sans (10pt) [GTK2/3/4]
Cursor: Moga-Sandy (72px)
Terminal: xfce4-terminal 1.1.4
Terminal Font: DejaVu Sans Mono (13pt)
CPU: AMD A10-7300 Radeon R6, 10 Compute Cores 4C+6G (4) @ 1.90 GHz
GPU: AMD Radeon R6 Graphics
Memory: 960.48 MiB / 6.54 GiB (14%)
Swap: 0 B / 6.95 GiB (0%)
Disk (/): 42.87 GiB / 908.98 GiB (5%) - ext4
Local IP (wlp2s0): 192.168.3.22/24
Battery (DELL WYT3M01A): 100% [AC Connected]
Locale: zh_CN.UTF-8
```

该说不说， Debian 配合 Xfce 对这个 14 年的老机真的适配相当不错，开两个 Xfce 终端标签页和一个 Mousepad 这类自带的程序占用不到 1 GB, Swap 更是用不上，不过这些软件上的帮助尽管有，但实际上仍然吃力。

推土机时代的旧架构拿来记事本 Coding 还不错（当然此处是 Mousepad），用 VS Code 尚且略显吃力，JetBrains 系列只怕困难重重。玩玩 MC 1.16.x 尚且还不错，其余往后就没试过了。

不过 Linserin 本人还是很有折腾精神的，不然也就不会把原本的 Windows 7 替换成 Debian 了。

当然，作为日用，很多时候我也会折腾，例如有时编译一些小项目（尽管多数时间都是下载预编译的成品），以及写 [笔记](/notes) 时的跑的小型前端静态项目（文档站），目前看下来暂时没有很大瓶颈，等等就好嘛。

不过，到了网页浏览这里，问题有点严重了。

用 Firefox 浏览网页遇到几次浏览一会儿就突然整个系统无响应，接着屏幕黑掉（但是有屏幕背光）。用 SSH 连接回复超时; 按下电源键没有 systemd 的关机停止服务的滚动日志，就是无响应。

而强制重启过后回看 journal 是啥也没有...我以后控制一下自己尽量不浏览太重量级的网页来勉强这机子吧。

实际上我基本上接触到的都是落后至少好几年起步的电子产品，For example, 我现在主力机是 P30Pro, 一台运行 iOS 15 的 iPhone 7 作为几乎不使用的摆一边的小东西。

P30Pro 尚且接个充电宝尚且能打，玩玩游戏能带动，就是只有 128 GB Mem 有点吃紧。

要不...等等吧...

用 Debian 的话，感谢 Debian 社区强大的软件生态，使用 `apt` 可以安装绝大多数程序，包管理相对方便。再者我现在很少玩游戏（玩 MC 也是可能一两个月才拿出来启动一次）。

那如果实在需要跑大型项目的，这个机子留着做 SSH 入口或者 RDP 入口，项目先挂在学校机房跑。其余的等我钱攒够了，准备换机子时再说。

那就这样。
