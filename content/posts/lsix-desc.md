+++
date = '2025-07-17T22:32:03+08:00'
draft = false
title = 'lsix - 在终端模拟器输出图像'
+++

# 展示

![lsix在mlterm](/img/lsix/lsix.png)

>lsix在mlterm

![lsix在UXTerm](/img/lsix/lsix1.png)

>lsix在uterm

Photo from [Unsplash](https://unsplash.com)

# 前言

你可能认为Linux终端就是枯燥的字符组成的，但实际上，如果你的终端支持的话它可以展示图片，[lsix](https://github.com/hackerb9/lsix)就是这样一个工具，同时由于其自身只是一个Shell脚本，因此其具有广泛的兼容性。


# 安装

其自身是一个Shell脚本，因此，直接复制到PATH并赋予权限即可。

使用wget安装:

```shell
wget https://raw.githubusercontent.com/hackerb9/lsix/master/lsix && \
sudo mv lsix /usr/local/bin && \
sudo chmod +x /usr/local/bin/lsix
```

使用cURL安装:

```shell
curl https://raw.githubusercontent.com/hackerb9/lsix/master/lsix > lsix && \
sudo mv lsix /usr/local/bin && \
sudo chmod +x /usr/local/bin/lsix
```

# 使用

cd到图片目录，执行`lsix`即可


## 无法输出图像

如果打印出这样的提示：

```text
Error: Your terminal does not report having sixel graphics support.

Please use a sixel capable terminal, such as xterm -ti vt340, or
ask your terminal manufacturer to add sixel support.

You may test your terminal by viewing a single image, like so:

convert foo.jpg  -geometry 800x480  sixel:-

If your terminal actually does support sixel, please file a bug
report at http://github.com/hackerb9/lsix/issues

Please mention device attribute codes: ^[[?65;1;9c

```

表明你的终端类型不支持[Sixel](https://en.wikipedia.org/wiki/Sixel)协议，可以使用[XTerm](https://xterm.dev)（需要设置终端类型），使用:

```shell
xterm -ti vt340
```

对于MacOS，可以使用[iTerm](https://iterm2.com/downloads.html)或[WezTerm](https://wezterm.org/installation.html)（同步支持Windows，Linux，FreeBSD，NetBSD，iTerm2需要在`references > Profiles > Terminal` 中启用 `Sixel graphics`。）
