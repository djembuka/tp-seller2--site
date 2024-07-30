window.BX = {
  ajax: {
    runComponentAction(name, type, data) {
      let result;
      if (name === 'twinpx:small-basket') {
        switch (type) {
          case 'init':
            result = new Promise((resolve, reject) => {
              resolve({
                status: 'success',
                data: {
                  html: `
  <link rel="stylesheet" href="../../components/basket/style.css" />
  
  <div class="slr2-basket-wrapper">
    <div class="slr2-container"></div>
    <div class="slr2-basket-preloader slr2-progress">
      <div class="slr2-progress-indeterminate"></div>
    </div>
  </div>
                  `,
                },
                errors: [{ message: 'Error message' }],
              });
              // reject({ errors: [{ code: 2, message: 'statuses error' }] });
            });
            break;

          case 'count':
            result = new Promise((resolve, reject) => {
              resolve({
                status: 'success',
                data: {
                  count: 10,
                },
                errors: [{ message: 'Error message' }],
              });
              // reject({ errors: [{ code: 2, message: 'statuses error' }] });
            });
            break;

          case 'load':
            result = new Promise((resolve, reject) => {
              resolve({
                status: 'success',
                data: {
                  html: `
  <div class="slr2-basket-content">
    <div class="slr2-basket-load-title">Последние добавленные товары</div>
    <div class="slr2-basket-load-grid">
      <div class="slr2-basket-load__item">
        <a href="" class="slr2-basket-load__img">
          <img
            src="../../components/basket/images/item.jpg"
            alt="Рубашка Liu Jo Uomo"
          />
        </a>
        <div class="slr2-basket-load__text">
          <a href="" class="slr2-basket-load__title">Рубашка Liu Jo Uomo</a>
          <div class="slr2-basket-load__price">30 000 руб.</div>
        </div>
      </div>
  
      <div class="slr2-basket-load__item">
        <a href="" class="slr2-basket-load__img">
          <img
            src="../../components/basket/images/item.jpg"
            alt="Рубашка Liu Jo Uomo"
          />
        </a>
        <div class="slr2-basket-load__text">
          <a href="" class="slr2-basket-load__title">Рубашка Liu Jo Uomo</a>
          <div class="slr2-basket-load__price">30 000 руб.</div>
        </div>
      </div>
  
      <div class="slr2-basket-load__item">
        <a href="" class="slr2-basket-load__img">
          <img
            src="../../components/basket/images/item.jpg"
            alt="Рубашка Liu Jo Uomo"
          />
        </a>
        <div class="slr2-basket-load__text">
          <a href="" class="slr2-basket-load__title">Рубашка Liu Jo Uomo</a>
          <div class="slr2-basket-load__price">30 000 руб.</div>
        </div>
      </div>
  
      <div class="slr2-basket-load__item">
        <a href="" class="slr2-basket-load__img">
          <img
            src="../../components/basket/images/item.jpg"
            alt="Рубашка Liu Jo Uomo"
          />
        </a>
        <div class="slr2-basket-load__text">
          <a href="" class="slr2-basket-load__title">Рубашка Liu Jo Uomo</a>
          <div class="slr2-basket-load__price">30 000 руб.</div>
        </div>
      </div>
    </div>
    <div class="slr2-basket-load-button">
      <a href="">
        <span>Перейти в корзину</span>
        <span>12 вещей на сумму 166 770 руб.</span>
      </a>
    </div>
  </div>
                    `,
                },
                errors: [{ message: 'Error message' }],
              });
              // reject({ errors: [{ code: 2, message: 'statuses error' }] });
            });
            break;
        }
      }

      if (name === 'twinpx:top-menu') {
        switch (type) {
          case 'init':
            result = new Promise((resolve, reject) => {
              resolve({
                status: 'success',
                data: {
                  html: `
<link rel="stylesheet" href="../../components/menu/style.css" />

<div class="slr2-menu-wrapper">
  <div class="slr2-container">
    <div class="slr2-menu-content">
      <div class="slr2-menu-content__item">
        <a href="">LookBook</a>
      </div>
      <div class="slr2-menu-content__item">
        <a href="">Акции</a>
      </div>
    </div>
  </div>
</div>
                `,
                },
                errors: [{ message: 'Error message' }],
              });
              // reject({ errors: [{ code: 2, message: 'statuses error' }] });
            });
            break;
        }
      }

      if (name === 'twinpx:user-profile') {
        switch (type) {
          case 'init':
            result = new Promise((resolve, reject) => {
              resolve({
                status: 'success',
                data: {
                  html: `
<link rel="stylesheet" href="../../components/profile/style.css" />

<div class="slr2-profile-wrapper">
  <div class="slr2-container">
    <div class="slr2-profile-content">
      <div class="slr2-profile-content__item">
        <a href="">Войти</a>
      </div>
      <div class="slr2-profile-content__item">
        <a href="">Зарегистрироваться</a>
      </div>
    </div>
    <div class="slr2-profile-content">
      <div class="slr2-profile-content__item">
        <a href="">Савельев Максим Олегович</a>
        <a href="" class="slr2-profile-content__photo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M8.5 21.3718V11.0282H7.5V21.3718H8.5ZM10 9.5H22V8.5H10V9.5ZM23.5 11.0282V21.3718H24.5V11.0282H23.5ZM23.5 21.3718C23.5 22.2224 22.8219 22.9 22 22.9V23.9C23.3873 23.9 24.5 22.7615 24.5 21.3718H23.5ZM22 9.5C22.8219 9.5 23.5 10.1776 23.5 11.0282H24.5C24.5 9.63852 23.3873 8.5 22 8.5V9.5ZM8.5 11.0282C8.5 10.1776 9.17814 9.5 10 9.5V8.5C8.61272 8.5 7.5 9.63851 7.5 11.0282H8.5ZM10 22.9C9.17814 22.9 8.5 22.2224 8.5 21.3718H7.5C7.5 22.7615 8.61272 23.9 10 23.9V22.9ZM18.5 16.2001C18.5 17.6108 17.3741 18.7424 16 18.7424V19.7424C17.9396 19.7424 19.5 18.1498 19.5 16.2001H18.5ZM16 18.7424C14.6259 18.7424 13.5 17.6108 13.5 16.2001H12.5C12.5 18.1498 14.0604 19.7424 16 19.7424V18.7424ZM13.5 16.2001C13.5 14.7894 14.6259 13.6578 16 13.6578V12.6578C14.0604 12.6578 12.5 14.2504 12.5 16.2001H13.5ZM16 13.6578C17.3741 13.6578 18.5 14.7894 18.5 16.2001H19.5C19.5 14.2504 17.9396 12.6578 16 12.6578V13.6578ZM22 22.9H10V23.9H22V22.9Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
      <div class="slr2-profile-content__item">
        <a href="">Мои данные</a>
        <a href="">Мой счет</a>
        <a href="">Мои заказы</a>
        <a href="">История заказов</a>
      </div>
      <div class="slr2-profile-content__item">
        <a href="">Выход</a>
      </div>
    </div>
  </div>
</div>
                `,
                },
                errors: [{ message: 'Error message' }],
              });
              // reject({ errors: [{ code: 2, message: 'statuses error' }] });
            });
            break;
        }
      }

      return result;
    },
  },
};
