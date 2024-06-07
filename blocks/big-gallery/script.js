window.addEventListener('load', () => {
  document.querySelectorAll('.slr2-big-gallery .swiper').forEach((swiper) => {
    let delay = 1 * swiper.getAttribute('data-delay');
    let timer = swiper.querySelector('.swiper-timer');

    new Swiper(swiper, {
      // Optional parameters
      loop: true,
      lazy: {
        loadPrevNext: true,
      },
      autoplay: {
        delay: delay,
        disableOnInteraction: false,
      },

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      on: {
        afterInit: () => {
          //set time to the detay attribute
          let swiperId = swiper
            .querySelector('.swiper-wrapper')
            .getAttribute('id');
          let styleTag = document.createElement('style');
          styleTag.textContent = `
          .slr2-big-gallery #${swiperId} ~ .swiper-timer--animate {
            -webkit-transition-duration: ${delay}ms;
            transition-duration: ${delay}ms;
          }
        `;
          document.head.appendChild(styleTag);
        },
        transitionStart: () => {
          if (!timer) return;
          timer.classList.remove('swiper-timer--animate');
          timer.style.width = '0';
        },
        transitionEnd: () => {
          if (!timer) return;
          timer.classList.add('swiper-timer--animate');
          timer.style.width = '100%';
        },
      },
    });
  });
});
