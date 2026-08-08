+++
date = '2026-07-28T11:19:24+08:00'
title = '字体与 Feed - What Has Been Improved'
categories = ["技术","杂谈"]
tags = ["博客","字体"]
+++
# 引言
大概一两个月之前，我对主题进行了修改，修改的内容大致是把左上的 Title 以及 Recent Posts 中的文章的 Title 给加上了 `text-shadow` 效果。

而就在不久前，QQ 上有网站访客跟我提到，`text-shadow` 对于近视等的患者会造成阅读上的困难。

事实上，我一开始加入 shadow 效果倒没有想得太多，而且 shadow 也不是全面使用的，不过既然了解这回事后，我也就说会在下一个 Deployment 中改一下。

那就简单 ~~水一篇~~ 说一下...
# Dropdown 菜单
这个主题有挺多地方可以完善一下的。For example, 在移动端的 Dropdown 菜单就是一个问题：

这是截图：
- - -
![](/img/dropdown-old.png)
- - -
>看起来就像一段话，没有明显分割
>
>~~当然也可能是主题作者没想到中文显示效果在这里这么奇怪~~

那好，就对着 item 修改一下就行
```css
div#nav-dropdown-menu .nav-item {
  border-bottom: 1px solid var(--dim-color);
}
```

这就有了 1px 的小分割。

然后也调整了布局，看起来就正常点...

# 字体

## 字体的使用
当初孩子不懂，直接使用了 [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono). 对于中文支持为无...

Mono 字体可能不适合文章阅读, 转而使用了 [Noto Sans Simplified Chinese](https://fonts.google.com/noto/specimen/Noto+Sans+SC) 作为正文字体。

## CodeBlock
换完字体发现代码块的字体并没有等宽，Noto Sans SC 不是一个等宽字体。

那就把 [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) 通过 Google Fonts API 引入并应用为代码块字体。
# Feed
根目录下方的 RSS XML 会把关于，友链，搜索等无关的页面编排进入，`no-index` 标注也并不能够将其从 RSS 中移除。结果搜索一番才发现，可以根据路径进行订阅。既然我只需要 `posts` 下方的文章，那就直接把订阅地址更换为 `/posts/rss.xml` 就行了

What's more, 如果阅读器支持，现在可以通过直接输入 `linserin.work` 来订阅 `/posts/` 下的更新而不会引入其余内容了。

