+++
date = '2026-07-07T05:28:18Z'
title = '将原始 Markdown 文件一同加入站点构建'
categories = ["技术"]
tags = ["Hugo", "博客", "Markdown"]
+++
直接在站点构建时把原文 Markdown 加入到构建中。

效果如上方所示
# 引言
Hugo 在默认情况下，是不会把原始 Markdown 一并加入构建输出的。但在翻阅由 Google 出品的 Docsy 主题文档后[^1]，发现是支持这一项功能的，但是默认情况不启用。(虽然这个功能在 Docsy 原文中是为了给 LLM Agents 准备的)

这项功能在一些情况下挺实用，例如要转载一篇长文章，直接复制显然不方便，直接下载 md 文件显得舒服很多。

# 动手
## 修改站点配置
Hugo 内置了多种输出格式，包括 HTML,RSS,JSON,Markdown。要启用 Markdown 输出，要需要配置添加到 Hugo 输出配置中。例如:
`hugo.yaml`:
```yaml
outputs:
  page: [HTML, markdown]
  section: [HTML, RSS, markdown]
```
- - -
`hugo.toml`:
```toml
[outputs]
page = [ "HTML", "markdown" ]
section = [ "HTML", "RSS", "print", "markdown" ]
```
- - -
`hugo.json`:
```json
{
  "outputs": {
    "page": ["HTML", "markdown"],
    "section": ["HTML", "RSS", "print", "markdown"]
  }
}
```


而以本站点为例子，我的配置文件是这样的:

`hugo.toml`:
```toml
baseURL = 'https://linserin.work/'
languageCode = 'zh-CN'
title = "Linserin Yang's Blog"
theme = 'rusty-typewriter'

[outputFormats]
  [outputFormats.RSS]
    mediatype = "application/rss+xml"
    baseName = "rss"
  [outputFormats.Markdown]
    mediaType = "text/markdown"
    baseName = "index"
    isPlainText = true
[outputs]
  page = ["HTML", "RSS", "Markdown"]
```
在这之后，还需要在 `Hugo 站点根目录/themes/[主题名称]/layouts/_default/` 中新建一个 `single.markdown.md`，内容为:
```
{{ .RawContent }}
```
*如需额外增加其它内容可自行修改。*
这样在访问文章时，Markdown 也一并输出在 `index.md` 中了。
## 在页面中加入 Markdown 指向链接
借助由 CDNJS 提供的 font-awesome 图标库可以直接添加 Markdown图标[^2]。
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<a href="{{ .RelPermalink }}index.md" class="md-source-link" title="查看 Markdown 原文">
  <i class="fa-brands fa-markdown"></i> 查看原文（Markdown）
</a>
```
这段短代码基本不会影响页面布局（如果仍然影响，请直接获取其 SVG 并嵌入），将其加入 `Hugo 站点根目录/themes/rusty-typewriter/layouts/_default/single.html` 即可.
# 结束
效果如脚注下方所示.

[^1]: [Docsy](https://www.docsy.dev/fr/docs/content/agent-support/)；

[^2]: [CDNJS 上的 font-awesome](https://cdnjs.com/libraries/font-awesome)；