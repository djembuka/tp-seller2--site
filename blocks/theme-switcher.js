window.addEventListener('load', () => {
  const themeSwitcherElem = document.createElement('div');
  themeSwitcherElem.className = 'slr2-theme-switcher';
  themeSwitcherElem.innerHTML = `
        <span>Светлая тема</span>
        <div></div>
        <span>Тёмная тема</span>
    `;

  const switcher = themeSwitcherElem.querySelector('div');
  switcher.addEventListener('click', (e) => {
    e.preventDefault();
    switcher.classList.toggle('dark');
    loadCSS(switcher);
  });

  document.querySelector('body').appendChild(themeSwitcherElem);

  loadCSS(switcher);

  const styleElem = document.createElement('style');
  styleElem.textContent = `
        .slr2-theme-switcher {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 100px;
        }
        .slr2-theme-switcher span {
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: #000;
        }
        .slr2-theme-switcher div {
            width: 80px;
            height: 32px;
            border-radius: 16px;
            background-color: var(--slr2-theme-switcher-color);
            margin: 0 32px;
            cursor: pointer;
            -webkit-transition: opacity .3s linear;
            transition: opacity .3s linear;
            position: relative;
            border: 1px solid var(--slr2-color-primary)
        }
        .slr2-theme-switcher div:hover {
            opacity: .7
        }
        .slr2-theme-switcher div:before {
            content: '';
            display: block;
            width: 26px;
            height: 26px;
            border-radius: 14px;
            background-color: var(--slr2-theme-switcher-cursor-color);
            position: absolute;
            top: 2px;
            left: 3px;
            -webkit-transition: left .3s ease;
            transition: left .3s ease;
        }
        .slr2-theme-switcher div.dark:before {
            left: calc(80px - 3px - 26px);
        }
    `;
  document.querySelector('head').appendChild(styleElem);

  function loadCSS(switcher) {
    const themeStylesheets = window.themeStylesheets || [
      'light.css',
      'dark.css',
    ];

    if (document.getElementById('slr2ThemeCSS')) {
      document.getElementById('slr2ThemeCSS').remove();
    }

    const linkElem = document.createElement('link');
    linkElem.id = 'slr2ThemeCSS';
    linkElem.rel = 'stylesheet';
    linkElem.href =
      themeStylesheets[switcher.classList.contains('dark') ? 1 : 0];

    document.querySelector('head').appendChild(linkElem);

    if (document.getElementById('slr2ThemeSwitcherCSS')) {
      document.getElementById('slr2ThemeSwitcherCSS').remove();
    }

    const styleElem = document.createElement('style');
    styleElem.id = 'slr2ThemeSwitcherCSS';
    if (switcher.classList.contains('dark')) {
      styleElem.textContent = `
        :root {
            --slr2-theme-switcher-color: var(--slr2-color-primary);
            --slr2-theme-switcher-cursor-color: #fff;
        }
    `;
    } else {
      styleElem.textContent = `
        :root {
            --slr2-theme-switcher-color: #fff;
            --slr2-theme-switcher-cursor-color: var(--slr2-color-primary);
        }
    `;
    }

    document.querySelector('head').appendChild(styleElem);
  }
});
