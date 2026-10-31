+++
title = 'Configuration'
date = '2025-03-24T23:00:00-03:00'
tags = ['guide']
topics = ['documentation']
featured = true
weight = 2
+++

This page outlines the configuration options for the theme. There are plenty of settings for tweaking your site's layout and content presentation. Key features include options for controlling the side pane visibility, adjusting the number of items displayed on each list page, and managing elements such as featured posts, recent posts, taxonomies, and related content.

## Global Config

The following configuration options can be added to your site's Hugo config file.

```toml
[rusty_typewriter]
 [params.rtwt]
  sidePane = true
  countPageItems = 7 
 [params.rtwt.home]
  showBio = true
  showAuthorImg = true
  sidePaneTags = true
  showFeatured = true
  showRecent = true
  hideRecentWhenFeatured = true
  countRecent = 5
 [params.rtwt.side.home]
  sidePaneSticky = false 
  taxonomies = ['tags']
  countTaxonomy = 5
 [params.rtwt.side.list]
  sidePaneSticky = false
 [params.rtwt.side.single]
  sidePaneSticky = true 
  showDetails = true
  showTableOfContents = true
  showAttachments = true
  showRelated = true
  countRelated = 5
```

## Page Config

Some configurations are defined in the page frontmatter, they're as following.

```toml
+++
[rtwt]
 sidePane = false
 sidePaneSticky = false
+++

...
```
