(() => {
  const componentObj = {
    name: 'basket',
    event: 'slr2BasketLoaded',
    component: 'slr2BasketComponent',
    method: 'toggle',
  };

  setTimeout(() => {
    fetchComponent();
  }, 2000);

  class Slr2BasketComponent {
    constructor(elem) {
      this.elem = elem;
      this.wrapper = this.elem.querySelector('.slr2-basket-wrapper');
      this.preloader = this.elem.querySelector('.slr2-basket-preloader');
      this.container = this.elem.querySelector('.slr2-container');
      this.count = 0;

      this.updateCount();
    }

    toggle() {
      !this.wrapper.classList.contains('slr2-slide-toggle--show')
        ? this.show()
        : this.hide();
    }

    show() {
      //let the site know, that the new component is going to be shown
      const event = new CustomEvent('slr2NewComponentIsShown', {
        detail: {
          name: 'basket',
        },
      });
      document.documentElement.dispatchEvent(event);

      //slide down
      const header = document.querySelector('header');
      this.wrapper.style.top =
        header.getBoundingClientRect().top + header.clientHeight + 'px';
      this.slideDown(this.wrapper);

      //load the content
      const p = this.loadContent();
      p.then((html) => {
        this.container.innerHTML = html;
        this.hideProgress();
        this.setHeight();
        this.wrapper.classList.add('slr2-basket--loaded');
      });
    }

    hide() {
      this.slideUp(this.wrapper);
      this.container.innerHTML = '';
      this.showProgress();
      this.wrapper.classList.remove('slr2-basket--loaded');
    }

    async updateCount() {
      const response = await fetch('../../components/basket/count.json');
      const result = await response.json();

      if (result.status === 'y') {
        this.count = result.data.count;

        const basketEvent = new CustomEvent('slr2BasketCountUpdated', {
          detail: { count: this.count },
        });
        document.documentElement.dispatchEvent(basketEvent);
      }

      return Promise;
    }

    loadContent() {
      return new Promise(async (res) => {
        let response = await fetch('../../components/basket/load.html');
        let result = await response.text();

        setTimeout(() => {
          res(result);
        }, 1000);
      });
    }

    hideProgress() {
      this.preloader.style.display = 'none';
    }

    showProgress() {
      this.preloader.style.display = 'block';
    }

    setHeight() {
      const content = this.elem.querySelector('.slr2-basket-content');
      if (!content) return;
      this.wrapper.style.height = content.clientHeight + 'px';
    }

    slideDown(block) {
      if (!block.classList.contains('slr2-slide-toggle')) {
        block.classList.add('slr2-slide-toggle');
      }
      if (!block.classList.contains('slr2-slide-toggle--show')) {
        block.classList.add('slr2-slide-toggle--show');
        block.style.height = 'auto';

        var height = block.clientHeight + 'px';

        block.style.height = '0px';

        setTimeout(() => {
          block.style.height = height;
        }, 0);
      }
    }

    slideUp(block) {
      if (!block.classList.contains('slr2-slide-toggle')) {
        block.classList.add('slr2-slide-toggle');
      }
      if (block.classList.contains('slr2-slide-toggle--show')) {
        block.style.height = '0px';

        block.addEventListener(
          'transitionend',
          () => {
            block.classList.remove('slr2-slide-toggle--show');
          },
          {
            once: true,
          }
        );
      }
    }

    slideToggle(block) {
      if (!block.classList.contains('slr2-slide-toggle')) {
        block.classList.add('slr2-slide-toggle');
      }
      if (!block.classList.contains('slr2-slide-toggle--show')) {
        block.classList.add('slr2-slide-toggle--show');
        block.style.height = 'auto';

        var height = block.clientHeight + 'px';

        block.style.height = '0px';

        setTimeout(() => {
          block.style.height = height;
        }, 0);
      } else {
        block.style.height = '0px';

        block.addEventListener(
          'transitionend',
          () => {
            block.classList.remove('slr2-slide-toggle--show');
          },
          {
            once: true,
          }
        );
      }
    }
  }

  async function fetchComponent() {
    const response = await fetch('../../components/basket/template.html');
    const result = await response.text();

    //загружаем и добавляем на страницу html, css
    //обёртка, чтобы не было видно html до загрузки стилей
    const div = document.createElement('div');
    div.className = 'slr2-basket-component-container';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '0';
    div.style.height = '0';
    div.style.overflow = 'hidden';
    div.style.opacity = '0';
    div.style.zIndex = '-1';

    const elem = document.createElement('div');
    elem.id = 'slr2BasketElem';
    elem.innerHTML = result;

    div.append(elem);
    document.querySelector('body').append(div);

    //добавляем экземпляр класса в глобальное пространство
    window.seller2[componentObj.component] = new Slr2BasketComponent(
      document.getElementById('slr2BasketElem')
    );

    //вызываем событие при загрузке компонента,
    //теперь на кнопку можно нажать
    const event = new Event(componentObj.event);
    document.documentElement.dispatchEvent(event);
  }
})();
