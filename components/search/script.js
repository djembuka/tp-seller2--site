(() => {
  const componentObj = {
    name: 'search',
    event: 'slr2SearchLoaded',
    component: 'slr2SearchComponent',
    method: 'toggle',
  };

  setTimeout(() => {
    fetchComponent();
  }, 2000);

  class Slr2SearchComponent {
    constructor(elem) {
      this.elem = elem;
      this.wrapper = this.elem.querySelector('.slr2-search-wrapper');
      this.input = this.elem.querySelector('.slr2-search-input');
      this.clear = this.elem.querySelector('.slr2-search-clear');
      this.init();
    }

    documentClick(event) {}

    init() {
      this.wrapper.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('slr2-search-wrapper')) {
          this.hide();
        }
      });

      this.clear.addEventListener('click', (e) => {
        e.preventDefault();
        this.input.value = '';
        this.input.focus();
        this.elem.classList.remove('slr2-search--filled');
      });

      this.input.addEventListener('keyup', () => {
        if (this.input.value.trim() !== '') {
          this.elem.classList.add('slr2-search--filled');
        } else {
          this.elem.classList.remove('slr2-search--filled');
        }
      });

      document.addEventListener(
        'keydown',
        (event) => {
          if (event.defaultPrevented) {
            return; // Should do nothing if the default action has been cancelled
          }

          let handled = false;
          if (event.key !== undefined) {
            if (event.key === 'Escape') {
              handled = true;
              this.hide();
            }
          } else if (event.code !== undefined) {
            if (event.code === 'Escape') {
              handled = true;
              this.hide();
            }
          }

          if (handled) {
            event.preventDefault();
          }
        },
        true
      );
    }

    toggle() {
      !this.elem.classList.contains('slr2-search--show')
        ? this.show()
        : this.hide();
    }

    show() {
      //let the site know, that the new component is going to be shown
      const event = new CustomEvent('slr2NewComponentIsShown', {
        detail: {
          name: 'search',
        },
      });
      document.documentElement.dispatchEvent(event);

      this.elem.classList.add('slr2-search--show');
      this.input.focus();
    }

    hide() {
      this.elem.classList.remove('slr2-search--show');
    }
  }

  async function fetchComponent() {
    const response = await fetch('../../components/search/template.html');
    const result = await response.text();

    //загружаем и добавляем на страницу html, css
    //обёртка, чтобы не было видно html до загрузки стилей
    const div = document.createElement('div');
    div.className = 'slr2-search-component-container';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '0';
    div.style.height = '0';
    div.style.overflow = 'hidden';
    div.style.opacity = '0';
    div.style.zIndex = '-1';

    const elem = document.createElement('div');
    elem.id = 'slr2SearchElem';
    elem.innerHTML = result;

    div.append(elem);
    document.querySelector('body').append(div);

    //добавляем экземпляр класса в глобальное пространство
    window.seller2[componentObj.component] = new Slr2SearchComponent(
      document.getElementById('slr2SearchElem')
    );

    //вызываем событие при загрузке компонента,
    //теперь на кнопку можно нажать
    const event = new Event(componentObj.event);
    document.documentElement.dispatchEvent(event);
  }
})();
