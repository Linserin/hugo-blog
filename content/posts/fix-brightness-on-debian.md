+++
date = '2026-08-27T12:15:53+08:00'
title = '[脱裤子放屁] 使用 blight 命令替代实现自动恢复亮度'
categories = ["技术"]
tags = ["技术", "Debian"]
+++
## 引言
在 [切换系统到 Debian 13](/posts/switch-to-debian/) 中我提到了在每次关机/重启时总是无法保存亮度设置，而打开 `systemctl list-units`：
```shell
╰─$ su -c 'systemctl list-units | grep backlight'
密码： 
  sys-devices-platform-dell\x2dlaptop-leds-dell::kbd_backlight.device                      loaded active plugged   /sys/devices/platform/dell-laptop/leds/dell::kbd_backlight
  systemd-backlight@leds:dell::kbd_backlight.service                                       loaded active exited    Load/Save Screen Backlight Brightness of leds:dell::kbd_backlight
  system-systemd\x2dbacklight.slice                                                        loaded active active    Slice /system/systemd-backlight
```

只有一个用来保存键盘背光的 unit, 于是每次开机后都要把亮度调整下来。

想了一下，折腾不明白不如自己写一个替代实现：只需要实现在关机（`poweroff` 或者 `halt`）以及重启前获取亮度，将其写入磁盘，而在系统启动时，将亮度值取出并设置就可以了。

这个时候我们可以使用 `blight` 工具。

## 使用 blight

首先我们需要安装 blight 工具:
```shell
su root
apt update
apt install blight -y
```
查看 `blight` 用法：
```shell
╭─linserin@debian ~/Desktop/Hugo
╰─$ blight help
blight: A backlight utility for Linux that plays well with hybrid GPUs

"And man said, 'let there b-light' and there was light." - Some Book 1:3

Flags: sweep [--sweep, -s], dev [--device <name>, -d <name>]
    Sweep flag lets you increase brightness gradually, resulting in a smooth change.
    Dev (short for device) flag lets you specify a backlight device target other than the default one.

Commands
inc [val] [flags: dev, sweep] -> increase brightness
dec [val] [flags: dev, sweep] -> decrease brightness
set [val] [flags: dev] -> set custom brightness value
save [flags: dev] -> save current brightness value to restore later
restore -> restore saved brightness value

setup -> installs udev rules and adds user to video group (run with sudo)
status [flags: dev] -> backlight device status
list -> list all backlight devices
help -> display help

Examples:
    sudo blight setup
    blight status (show backlight device status info)
    blight inc 5 --sweep (increase brightness smoothly by 5%)
    blight set 10 (sets the brightness value to 10)
    blight inc 2 -s -d nvidia_0 (increases nvidia_0's brightness smoothly by 2%)

```
不难看出，这里 `blight` 工具提供了一个 `save` 和一个 `restore`，用来保存和恢复亮度值。但是我们这里不使用。[^1]

### 初始化 blight
让我们首先初始化 `blight` 工具：
```shell
sudo blight setup
```

那么我们就能直接通过 `blight status` 取得亮度值，通过 `blight set <value>` 恢复亮度值了
### 思路
如何在每次开机关机时执行操作？这个时候就需要创建一个服务了。

首先查看 blight 的文件位置:

```shell
╭─linserin@debian ~/Desktop/Hugo
╰─$ which blight
/usr/bin/blight
```

位于 `/usr/bin/blight`，我们记录下来。

那么我创建一个程序，设定命令行参数 `save` 从 `blight status` 中获取亮度值并写入磁盘，以及 `save` 参数从磁盘中获取并通过 `blight set` 来设置。

由于需求其实很简单，扔给一个稍微聪明点的 AI 都能快速解决，就不纠结怎么写这个程序了。

此处我使用 Go 语言编写：[GitHub Gists](https://gist.github.com/Linserin/ca7be25459b7a8d0b78e77c53d3df56e) | [paste.opendev.org](https://paste.opendev.org/show/bvWfrTr93HyaBXok5vXs/)

将其编译后产物移动到:
```
/usr/bin/blightctl
```

### 创建服务
```shell
su root
cd /etc/systemd/system/
nano backlight.service
```
将下方文件内容粘贴:
```service
[Unit]
Description=Save and restore backlight brightness via blight
Before=shutdown.target reboot.target halt.target
After=graphical-session.target

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/bin/blightctl restore
ExecStop=/usr/bin/blightctl save
StandardOutput=tty
StandardError=tty
TTYPath=/dev/tty1

[Install]
WantedBy=graphical-session.target
```
这样，就创建了一个 `backlight.service` 服务，能自动保存亮度了。

现在保存所有信息，重启试试看:
```shell
systemctl reboot
```

[^1]: 由于直接使用 `blight restore` 会由于不知名原因导致 `blight` 出错，但是由另一个程序通过命令行手动指定亮度值是可行的，因此此处不使用 `blight restore`。