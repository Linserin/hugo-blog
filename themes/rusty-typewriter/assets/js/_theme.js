(function() {
    "use strict";

    const getCachedTheme = () => {
      const theme = document.body.getAttribute("color-scheme");
      const cachedTheme = localStorage.getItem("color-scheme");
      if (cachedTheme) {
        return cachedTheme;
      } else if (theme !== "dark" && theme !== "light") {
        let preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return preferDark ? "dark" : "light";
      } else {
        return theme;
      }
    };

    const toggle = (state) => state === "light" ? "dark" : "light";
    const initTheme = (state) => {
      document.documentElement.setAttribute("color-scheme", state);
    };

    let badgeImg = null;

    const updateBadge = (theme) => {
      if (!badgeImg) return;
      const isDark = theme === "dark";
      badgeImg.src = isDark
        ? "/svg/notbyai/Written-By-Human-Not-By-AI-Badge-black.svg"
        : "/svg/notbyai/Written-By-Human-Not-By-AI-Badge-white.svg";
    };

    const toggleTheme = () => {
      const state = getCachedTheme();
      const newState = toggle(state);
      localStorage.setItem("color-scheme", newState);
      initTheme(newState);
      updateBadge(newState);
    };

    window.addEventListener("DOMContentLoaded", () => {

      const theme = getCachedTheme();
      initTheme(theme);
      requestAnimationFrame(() => document.body.classList.remove("notransition"));

      const placeholder = document.getElementById("badge-placeholder");
      if (placeholder) {
        const img = document.createElement("img");
        img.id = "not-by-ai-badge";
        img.alt = "Written by Human, Not by AI";
        img.src = theme === "dark"
          ? "/svg/notbyai/Written-By-Human-Not-By-AI-Badge-black.svg"
          : "/svg/notbyai/Written-By-Human-Not-By-AI-Badge-white.svg";
        placeholder.parentNode.replaceChild(img, placeholder);
        badgeImg = img;
      } else {
        console.warn("未找到 id='badge-placeholder' 的元素，请检查页脚 HTML。");
      }

      const switcher = document.getElementById("theme-switcher");
      if (switcher) {
        switcher.addEventListener("click", (e) => {
          e.preventDefault();
          toggleTheme();
        });
      }
    });
})();

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('pre').forEach(function (preBlock) {
    // 防止重复初始化
    if (preBlock.dataset.copyButtonReady === '1') return;
    preBlock.dataset.copyButtonReady = '1';
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';

    const parent = preBlock.parentNode;
    parent.insertBefore(wrapper, preBlock);
    wrapper.appendChild(preBlock);

    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.type = 'button';
    copyButton.title = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy');
    copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `;

    wrapper.appendChild(copyButton);

    copyButton.addEventListener('click', function () {
      const codeEl = preBlock.querySelector('code');
      const code = codeEl ? codeEl.innerText : preBlock.innerText;

      navigator.clipboard.writeText(code).then(function () {
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        copyButton.classList.add('copied');

        setTimeout(function () {
          copyButton.innerHTML = originalHTML;
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        const originalHTML = copyButton.innerHTML;
        copyButton.textContent = 'Failed!';
        copyButton.classList.add('error');

        setTimeout(function () {
          copyButton.innerHTML = originalHTML;
          copyButton.classList.remove('error');
        }, 2000);
      });
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // 检查是否存在 #main-pane 元素
  const mainPane = document.getElementById('main-pane');
  if (!mainPane) {
    return; // 如果没有 #main-pane，直接返回，不创建进度条
  }
  
  // 创建进度条容器
  const progressBarContainer = document.createElement('div');
  progressBarContainer.id = 'reading-progress-bar';
  progressBarContainer.style.position = 'fixed';
  progressBarContainer.style.top = '0';
  progressBarContainer.style.left = '0';
  progressBarContainer.style.width = '100%';
  progressBarContainer.style.height = '2px';
  progressBarContainer.style.backgroundColor = '#e0e0e0';
  progressBarContainer.style.zIndex = '9999';
  
  // 创建进度条
  const progressBar = document.createElement('div');
  progressBar.style.position = 'absolute';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.width = '0%';
  progressBar.style.height = '100%';
  progressBar.style.backgroundColor = '#4285f4';
  progressBar.style.transition = 'width 0.1s ease-out';
  
  // 创建粒子效果容器
  const particlesContainer = document.createElement('div');
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.right = '0';
  particlesContainer.style.height = '2px';
  particlesContainer.style.width = '2px';
  particlesContainer.style.overflow = 'hidden';
  
  progressBar.appendChild(particlesContainer);
  progressBarContainer.appendChild(progressBar);
  document.body.appendChild(progressBarContainer);
  
  // 创建粒子
  function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    particle.style.borderRadius = '50%';
    particle.style.right = '0';
    particle.style.top = Math.random() * 4 + 'px';
    
    particlesContainer.appendChild(particle);
    
    // 粒子动画
    const duration = Math.random() * 1000 + 500;
    const startTime = performance.now();
    
    function animateParticle(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        particle.style.transform = `translateX(-${progress * 20}px)`;
        particle.style.opacity = 1 - progress;
        requestAnimationFrame(animateParticle);
      } else {
        particle.remove();
      }
    }
    
    requestAnimationFrame(animateParticle);
  }
  
  // 定期创建粒子
  let particleInterval;
  function startParticles() {
    particleInterval = setInterval(createParticle, 100);
  }
  
  function stopParticles() {
    clearInterval(particleInterval);
  }
  
  // 计算阅读进度
  function calculateReadingProgress() {
    // 使用 #main-pane 作为计算基准
    const article = mainPane;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    // 计算文章在视口中的位置
    const articleOffset = article.offsetTop;
    const articlePosition = scrollPosition - articleOffset;
    
    // 计算进度百分比
    let progress = 0;
    if (scrollPosition >= articleOffset) {
      progress = (articlePosition / (articleHeight - windowHeight)) * 100;
      progress = Math.min(Math.max(progress, 0), 100);
    }
    
    progressBar.style.width = progress + '%';
    
    // 当进度大于0且小于100时显示粒子效果
    if (progress > 0 && progress < 100) {
      if (!particleInterval) startParticles();
    } else {
      stopParticles();
      particleInterval = null;
    }
  }
  
  // 监听滚动事件
  window.addEventListener('scroll', calculateReadingProgress);
  window.addEventListener('resize', calculateReadingProgress);
  
  // 初始计算
  calculateReadingProgress();
});

