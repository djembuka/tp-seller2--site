class slr2Header1 {
  constructor(elem) {
    this.header = elem;
    this.menu = this.header.querySelector('.slr2-header1__menu');
    this.menuItems = this.menu.querySelectorAll('.slr2-header1__menu-item');
    this.itemsWidth = 0;
    this.edgeIndex;

    this.init();
  }

  init() {
    this.setItemsWidth();
    this.initEdgeIndex();
    this.setItemsHidden();
    this.initResize();
  }

  setItemsWidth() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      this.menuItems.forEach((item) => {
        item.setAttribute('data-width', item.clientWidth);
      });
    } else {
      this.menu.setAttribute(
        'style',
        'display: block; opacity: 0; position: absolute; top: 0; left: 0; z-index: -1;'
      );

      this.menuItems.forEach((item) => {
        item.setAttribute('data-width', item.clientWidth);
      });

      this.menu.removeAttribute('style');
    }
  }

  initEdgeIndex() {
    this.itemsWidth = 0;
    this.edgeIndex = undefined;

    this.menuItems.forEach((item, index) => {
      this.itemsWidth += Number(item.getAttribute('data-width'));
      if (
        Math.ceil(this.itemsWidth + index * 32 + 32 + 32 + 64) >
          Math.floor(this.menu.clientWidth) &&
        this.edgeIndex === undefined
      ) {
        this.edgeIndex = index - 1;
      }
    });
  }

  setItemsHidden() {
    this.menuItems.forEach((item, index) => {
      if (!this.edgeIndex || index <= this.edgeIndex) {
        item.classList.remove('slr2-header1__menu-item--hidden');
        item.classList.add('slr2-header1__menu-item--visible');
      } else {
        item.classList.remove('slr2-header1__menu-item--visible');
        item.classList.add('slr2-header1__menu-item--hidden');
      }
    });
  }

  initResize() {
    window.addEventListener('resize', () => {
      this.initEdgeIndex();
      this.setItemsHidden();
    });
  }
}

window.addEventListener('load', () => {
  const slr2Header1Elem = new slr2Header1(
    document.querySelector('.slr2-header1')
  );
});

window.addEventListener('DOMContentLoaded', () => {
  const icons = [
    {
      name: 'phone',
      event: 'slr2PhoneLoaded',
      component: 'slr2PhoneComponent',
      method: 'show',
    },
    {
      name: 'basket',
      event: 'slr2BasketLoaded',
      component: 'slr2BasketComponent',
      method: 'show',
    },
    {
      name: 'menu',
      event: 'slr2MenuLoaded',
      component: 'slr2MenuComponent',
      method: 'show',
    },
    {
      name: 'mobile-menu',
      event: 'slr2MobileMenuLoaded',
      component: 'slr2MobileMenuComponent',
      method: 'show',
    },
    {
      name: 'profile',
      event: 'slr2ProfileLoaded',
      component: 'slr2ProfileComponent',
      method: 'show',
    },
    {
      name: 'search',
      event: 'slr2SearchLoaded',
      component: 'slr2SearchComponent',
      method: 'show',
    },
  ];

  document.querySelectorAll('.slr2-header1').forEach((slr2Header1) => {
    icons.forEach((iconObj, index) => {
      slr2Header1
        .querySelectorAll(`.slr2-header1__${iconObj.name}-icon`)
        .forEach((icon) => {
          if (window[iconObj.component]) {
            onComponentLoaded(icon, iconObj);
          } else {
            document.documentElement.addEventListener(iconObj.event, () => {
              onComponentLoaded(icon, iconObj);
            });
          }
        });

      if (index === 1) {
        //basket
        if (window[iconObj.component]) {
          onBasketChanged(
            slr2Header1,
            iconObj,
            window[iconObj.component].getCount()
          );
        }
        document.documentElement.addEventListener(
          'slr2BasketCountChanged',
          (e) => {
            onBasketChanged(slr2Header1, iconObj, e.detail.count);
          }
        );
      }
    });
  });

  function onBasketChanged(header, iconObj, count) {
    header
      .querySelectorAll(`.slr2-header1__${iconObj.name}-icon`)
      .forEach((basket) => {
        if (Number(count) > 0 && basket.querySelector('span')) {
          basket.querySelector('span').textContent = count;
          basket.classList.add('slr2-header1__basket-full');
        } else {
          basket.classList.remove('slr2-header1__basket-full');
        }
      });
  }

  function onComponentLoaded(icon, iconObj) {
    icon.classList.remove('slr2--icon-preloader');
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      if (
        window[iconObj.component] &&
        window[iconObj.component][iconObj.method]
      ) {
        window[iconObj.component][iconObj.method]();
      }
    });
  }
});
