(() => {
  const componentObj = {
    name: 'phone',
    event: 'slr2PhoneLoaded',
    component: 'slr2PhoneComponent',
    method: 'toggle',
  };

  setTimeout(() => {
    fetchComponent();
  }, 2000);

  class Slr2PhoneComponent {
    constructor(elem) {
      this.elem = elem;
      this.wrapper = this.elem.querySelector('.slr2-phone-wrapper');
      this.init();
    }

    init() {
      this.wrapper.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('slr2-phone-wrapper')) {
          this.hide();
        }
      });
    }

    documentClick(event) {}

    toggle() {
      !this.elem.classList.contains('slr2-phone--show')
        ? this.show()
        : this.hide();
    }

    show() {
      //let the site know, that the new component is going to be shown
      const event = new CustomEvent('slr2NewComponentIsShown', {
        detail: {
          name: 'phone',
        },
      });
      document.documentElement.dispatchEvent(event);

      this.elem.classList.add('slr2-phone--show');
    }

    hide() {
      this.elem.classList.remove('slr2-phone--show');
    }
  }

  async function fetchComponent() {
    const response = await fetch('../../components/phone/template.html');
    const result = await response.text();

    //загружаем и добавляем на страницу html, css
    //обёртка, чтобы не было видно html до загрузки стилей
    const div = document.createElement('div');
    div.className = 'slr2-phone-component-container';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '0';
    div.style.height = '0';
    div.style.overflow = 'hidden';
    div.style.opacity = '0';
    div.style.zIndex = '-1';

    const elem = document.createElement('div');
    elem.id = 'slr2PhoneElem';
    elem.innerHTML = result;

    div.append(elem);
    document.querySelector('body').append(div);

    //добавляем экземпляр класса в глобальное пространство
    window.seller2[componentObj.component] = new Slr2PhoneComponent(
      document.getElementById('slr2PhoneElem')
    );

    //вызываем событие при загрузке компонента,
    //теперь на кнопку можно нажать
    const event = new Event(componentObj.event);
    document.documentElement.dispatchEvent(event);
  }
})();
