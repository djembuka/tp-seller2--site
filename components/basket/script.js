(() => {
  const componentObj = {
    name: 'basket',
    event: 'slr2BasketLoaded',
    component: 'slr2BasketComponent',
    method: 'toggle',
  };

  fetchComponent();

  class Slr2BasketComponent {
    constructor(elem) {
      this.elem = elem;
      this.name = 'basket';
      this.wrapper = this.elem.querySelector('.slr2-basket-wrapper');
      this.preloader = this.elem.querySelector('.slr2-basket-preloader');
      this.container = this.elem.querySelector('.slr2-container');
      this.count = 0;

      this.updateCount();
    }

    documentClick(event) {
      if (
        event.target.id === this.id ||
        event.target.closest(`#${this.elem.id}`) ||
        event.target.getAttribute('data-slr2toggle') === this.name ||
        (event.target.closest(`[data-slr2toggle]`) &&
          event.target
            .closest(`[data-slr2toggle]`)
            .getAttribute('data-slr2toggle') === this.name)
      ) {
        return;
      }
      this.hide();
    }

    toggle() {
      !this.wrapper.classList.contains('slr2-slide-toggle--show')
        ? this.show()
        : this.hide();
    }

    show() {
      this.styleContainer.removeAttribute('style');

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

    updateCount() {
      if (!window.BX) return;

      const th = this;
      BX.ajax
        .runComponentAction('twinpx:small-basket', 'count', {
          mode: 'class',
          method: 'GET',
          data: {},
        })
        .then(
          (response) => {
            th.count = response.data.count;
            const basketEvent = new CustomEvent('slr2BasketCountUpdated', {
              detail: { count: th.count },
            });
            document.documentElement.dispatchEvent(basketEvent);
          },
          (error) => {
            //сюда будут приходить все ответы, у которых status !== 'success'
            console.log(error);
          }
        );

      return Promise;
    }

    loadContent() {
      return new Promise((res) => {
        if (!window.BX) return;

        BX.ajax
          .runComponentAction('twinpx:small-basket', 'load', {
            mode: 'class',
            method: 'GET',
          })
          .then(
            (response) => {
              let result = response.data.html;
              res(result);
            },
            (error) => {
              //сюда будут приходить все ответы, у которых status !== 'success'
              console.log(error);
            }
          );
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

        let height = block.clientHeight + 'px';

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
        if (block.style.height === '0px') {
          block.classList.remove('slr2-slide-toggle--show');
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

    slideToggle(block) {
      if (!block.classList.contains('slr2-slide-toggle')) {
        block.classList.add('slr2-slide-toggle');
      }
      if (!block.classList.contains('slr2-slide-toggle--show')) {
        block.classList.add('slr2-slide-toggle--show');
        block.style.height = 'auto';

        let height = block.clientHeight + 'px';

        block.style.height = '0px';

        setTimeout(() => {
          block.style.height = height;
        }, 0);
      } else {
        if (block.style.height === '0px') {
          block.classList.remove('slr2-slide-toggle--show');
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
  }

  function fetchComponent() {
    const th = this;

    //загружаем и добавляем на страницу html, css
    //обёртка, чтобы не было видно html до загрузки стилей
    if (!window.BX) return;

    BX.ajax
      .runComponentAction('twinpx:small-basket', 'init', {
        mode: 'class',
        method: 'GET',
      })
      .then(
        (response) => {
          const result = response.data.html;

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
          window.seller2 = window.seller2 || {};
          window.seller2[componentObj.component] = new Slr2BasketComponent(
            document.getElementById('slr2BasketElem')
          );

          window.seller2[componentObj.component].styleContainer = div;

          //вызываем событие при загрузке компонента,
          //теперь на кнопку можно нажать
          const event = new Event(componentObj.event);
          document.documentElement.dispatchEvent(event);
        },
        (error) => {
          //сюда будут приходить все ответы, у которых status !== 'success'
          console.log(error);
        }
      );
  }
})();
