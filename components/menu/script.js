(() => {
  const componentObj = {
    name: 'menu',
    event: 'slr2MenuLoaded',
    component: 'slr2MenuComponent',
    method: 'toggle',
  };

  setTimeout(() => {
    fetchComponent();
  }, 2000);

  class Slr2MenuComponent {
    constructor(elem) {
      this.elem = elem;
      this.wrapper = this.elem.querySelector('.slr2-menu-wrapper');
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
          name: 'menu',
        },
      });
      document.documentElement.dispatchEvent(event);

      const header = document.querySelector('header');
      this.wrapper.style.top =
        header.getBoundingClientRect().top + header.clientHeight + 'px';
      this.slideDown(this.wrapper);
    }

    hide() {
      this.slideUp(this.wrapper);
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
    const response = await fetch('../../components/menu/template.html');
    const result = await response.text();

    //загружаем и добавляем на страницу html, css
    //обёртка, чтобы не было видно html до загрузки стилей
    const div = document.createElement('div');
    div.className = 'slr2-menu-component-container';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '0';
    div.style.height = '0';
    div.style.overflow = 'hidden';
    div.style.opacity = '0';
    div.style.zIndex = '-1';

    const elem = document.createElement('div');
    elem.id = 'slr2MenuElem';
    elem.innerHTML = result;

    div.append(elem);
    document.querySelector('body').append(div);

    //добавляем экземпляр класса в глобальное пространство
    window.seller2[componentObj.component] = new Slr2MenuComponent(
      document.getElementById('slr2MenuElem')
    );

    //вызываем событие при загрузке компонента,
    //теперь на кнопку можно нажать
    const event = new Event(componentObj.event);
    document.documentElement.dispatchEvent(event);
  }
})();
