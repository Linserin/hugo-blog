+++
date = '2025-07-25T15:53:36+08:00'
draft = false
title = '本站评论区以及RSS上线'
tags = "站点日志"
+++

# 引言

本站通过[hugo](https://gohugo.io/)构建，部署于[Cloudflare Pages](https://pages.dev)，想着博客缺少什么？当然是评论区和RSS，所以，评论区和RSS就上线了

# 评论区

评论区运行于[Cloudflare Workers](https://workers.dev)，使用[KV](https://developers.cloudflare.com/kv/)存储数据

# RSS

其实Hugo能自己构建RSS订阅的，但是它保存在`index.xml`处，查阅一番，可以在`hugo.toml`处更改生成的文件名，如
```toml
[outputFormats]
[outputFormats.RSS]
mediatype = "application/rss+xml"
baseName = "rss"
```

这样就能保存到`rss.xml`了。

# 其他

评论区系统还存在问题，但是基本不影响使用，以后有空大概率会改（？

此外Cloudflare的KV通过命中缓存来减少配额的消耗，这点还是很不错的

