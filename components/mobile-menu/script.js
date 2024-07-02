(() => {
  const componentObj = {
    name: 'mobile-menu',
    event: 'slr2MobileMenuLoaded',
    component: 'slr2MobileMenuComponent',
    method: 'toggle',
  };

  let fetchFlag;

  setTimeout(() => {
    fetchComponent();
  }, 2000);

  window.addEventListener('resize', () => {
    fetchComponent();
  });

  class Slr2MobileMenuComponent {
    constructor(elem) {
      this.elem = elem;
      this.elements();
      this.events();
    }

    elements() {
      this.mmItems = this.elem.querySelectorAll('.slr2-mobile-menu__item');
      this.mmLinks = this.elem.querySelectorAll('.slr2-mobile-menu__link');
      this.mmClose = this.elem.querySelector('.slr2-mobile-menu__close');
    }

    events() {
      //click link
      this.mmLinks.forEach((menuLink) => {
        menuLink.addEventListener('click', (e) => {
          if (menuLink.classList.contains('i-link')) {
            return;
          }
          e.preventDefault();
          this.clickLink(menuLink);
        });
      });
      //close
      this.mmClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.show();
      });
    }

    documentClick(event) {}

    clickLink(menuLink) {
      const item = menuLink.closest('.slr2-mobile-menu__item');
      if (!item.classList.contains('active')) {
        //slide up all active items
        this.elem
          .querySelectorAll('.slr2-mobile-menu__item.active')
          .forEach((activeItem) => {
            this.itemActiveRemove(activeItem);
          });
      }

      this.itemActiveToggle(item);
    }

    toggle() {
      !this.elem.classList.contains('slr2-mobile-menu--show')
        ? this.show()
        : this.hide();
    }

    show() {
      //let the site know, that the new component is going to be shown
      const event = new CustomEvent('slr2NewComponentIsShown', {
        detail: {
          name: 'mobile-menu',
        },
      });
      document.documentElement.dispatchEvent(event);

      this.elem.classList.add('slr2-mobile-menu--show');
      document.querySelector('body').classList.add('slr2-body--no-scroll');

      //deactivate items
      this.mmItems.forEach((item) => {
        this.itemActiveRemove(item);
      });
    }

    hide() {
      this.elem.classList.remove('slr2-mobile-menu--show');
      document.querySelector('body').classList.remove('slr2-body--no-scroll');

      //deactivate items
      this.mmItems.forEach((item) => {
        this.itemActiveRemove(item);
      });
    }

    itemActiveAdd(item) {
      if (!item.classList.contains('active')) {
        item.classList.add('active');
        this.slideDown(item.querySelector('.slr2-mobile-menu__sub'));
      }
    }

    itemActiveRemove(item) {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        this.slideUp(item.querySelector('.slr2-mobile-menu__sub'));
      }
    }

    itemActiveToggle(item) {
      item.classList.toggle('active');
      this.slideToggle(item.querySelector('.slr2-mobile-menu__sub'));
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
    if (!window.matchMedia('(max-width: 1024px)').matches || fetchFlag) return;

    fetchFlag = true;

    const response = await fetch('../../components/mobile-menu/template.html');
    const result = await response.text();

    //загружаем и добавляем на страницу html, css
    //обёртка, чтобы не было видно html до загрузки стилей
    const div = document.createElement('div');
    div.className = 'slr2-mobile-menu-component-container';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '0';
    div.style.height = '0';
    div.style.overflow = 'hidden';
    div.style.opacity = '0';
    div.style.zIndex = '-1';

    const elem = document.createElement('div');
    elem.id = 'slr2MobileMenuElem';
    elem.innerHTML = result;

    div.append(elem);
    document.querySelector('body').append(div);

    //добавляем экземпляр класса в глобальное пространство
    window.seller2[componentObj.component] = new Slr2MobileMenuComponent(
      document.getElementById('slr2MobileMenuElem')
    );

    //вызываем событие при загрузке компонента,
    //теперь на кнопку можно нажать
    const event = new Event(componentObj.event);
    document.documentElement.dispatchEvent(event);
  }
})();
