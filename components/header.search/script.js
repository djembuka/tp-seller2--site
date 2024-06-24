(() => {
  const componentObj = {
    name: 'slr2SearchComponent',
    event: 'slr2SearchLoaded',
    method: 'show',
  };

  setTimeout(() => {
    const event = new Event(componentObj.event);
    document.documentElement.dispatchEvent(event);

    window[componentObj.name] = {};
    fetchHeaderSearch();

    window[componentObj.name][componentObj.method] = function () {
      componentObj.inst.show();
    };
  }, 2000);

  async function fetchHeaderSearch() {
    const response = await fetch('/components/header.search/template.html');
    const result = await response.text();

    const div = document.createElement('div');
    div.innerHTML = result;

    document.querySelector('body').append(div);

    class Slr2Search {
      constructor(elem) {
        this.elem = elem;
        this.wrapper = this.elem.querySelector('.slr2-search-wrapper');
        this.input = this.elem.querySelector('.slr2-search-input');
        this.clear = this.elem.querySelector('.slr2-search-clear');
        this.init();
      }

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

      show() {
        this.elem.classList.add('slr2-search--show');
        this.input.focus();
      }

      hide() {
        this.elem.classList.remove('slr2-search--show');
      }
    }

    componentObj.inst = new Slr2Search(
      document.getElementById('slr2SearchElem')
    );
  }
})();
