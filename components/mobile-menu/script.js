(() => {
  const componentObj = {
    name: 'mobile-menu',
    event: 'slr2MobileMenuLoaded',
    component: 'slr2MobileMenuComponent',
    method: 'show',
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
      this.twpxMobileMenuTitleElem = this.elem.querySelector(
        '.twpx-mobile-menu__title'
      );
      this.mobileMenu = this.elem.querySelector('.twpx-mobile-menu-container');
    }

    events() {
      this.mobileMenu
        .querySelectorAll('.twpx-mobile-menu__link')
        .forEach((menuLink) => {
          menuLink.addEventListener('click', (e) => {
            if (menuLink.classList.contains('i-link')) {
              return;
            }
            e.preventDefault();

            if (
              !menuLink
                .closest('.twpx-mobile-menu__item')
                .classList.contains('active')
            ) {
              //slide up
              mobileMenu
                .querySelectorAll('.twpx-mobile-menu__item.active')
                .forEach((menuItem) => {
                  menuItem.classList.remove('active');
                });
              $('.twpx-mobile-menu-sub:visible').slideUp();
            }

            //show current
            menuLink
              .closest('.twpx-mobile-menu__item')
              .classList.toggle('active');
            $(
              menuLink.parentNode.querySelector('.twpx-mobile-menu-sub')
            ).slideToggle();
          });
        });
    }

    show() {
      console.log('show');
      // $('.twpx-mobile-menu__block').slideToggle();
      // $('.twpx-mobile-menu-sub:visible').slideUp();
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
    div.style.opacity = '0';
    div.style.zIndex = '-1';

    const elem = document.createElement('div');
    elem.id = 'slr2MobileMenuElem';
    elem.innerHTML = result;

    div.append(elem);
    document.querySelector('body').append(div);

    //вызываем событие при загрузке компонента,
    //теперь на кнопку можно нажать
    const event = new Event(componentObj.event);
    document.documentElement.dispatchEvent(event);

    //добавляем экземпляр класса в глобальное пространство
    window.seller2[componentObj.component] = new Slr2MobileMenuComponent(
      document.getElementById('slr2MobileMenuElem')
    );
  }
})();
