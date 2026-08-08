+++
date = '1999-01-01T00:00:00+08:00'
draft = false
title = '第一篇文章'
+++

Test
**Test**

# html

```html
<svg width="80" height="80" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* 动画关键帧 */
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    
    /* 轨迹样式 */
    .track {
      stroke: #eee;
      fill: none;
    }
    
    /* 动画路径样式 */
    .spin {
      stroke: #3f51b5;
      stroke-linecap: round;
      fill: none;
      animation: rotate 0.475s linear infinite;
      transform-origin: 50% 50%;
    }
  </style>
  
  <!-- 背景轨迹 -->
  <circle class="track" cx="19" cy="19" r="15" stroke-width="1"/>
  
  <!-- 动画路径 -->
  <circle class="spin" cx="19" cy="19" r="15" 
          stroke-width="3"
          stroke-dasharray="25 500"
          stroke-dashoffset="0.2"/>
</svg>
```


# end
