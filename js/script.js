window.seller2 = window.seller2 || {};
window.seller2.componentNames = [
  'search',
  'profile',
  'menu',
  'catalog-menu',
  'mobile-menu',
  'basket',
  'phone',
];
window.seller2.utils = {};
window.seller2.utils.className = (name) => {
  return name
    .split('-')
    .map((n) => n.substring(0, 1).toUpperCase() + n.substring(1))
    .join('');
};

window.seller2.toggleButtons = () => {
  //собираем уникальные значения атрибутов slr2toggle
  const components = new Set();
  document.querySelectorAll('[data-slr2toggle]').forEach((elem) => {
    components.add(elem.getAttribute('data-slr2toggle'));
  });

  //формируем массив данных для каждого компонента
  const icons = Array.from(components).map((c) => {
    return {
      name: c,
      event: `slr2${window.seller2.utils.className(c)}Loaded`,
      component: `slr2${window.seller2.utils.className(c)}Component`,
      method: 'toggle',
    };
  });

  //после загрузки компонента будет вызвана функция onComponentLoaded
  icons.forEach((iconObj) => {
    if (window.seller2[iconObj.component]) {
      onComponentLoaded(iconObj);
    } else {
      document.documentElement.addEventListener(iconObj.event, () => {
        onComponentLoaded(iconObj);
      });
    }
  });

  function onComponentLoaded(iconObj) {
    //находим все элементы, работающие с компонентом
    const elems = document.querySelectorAll(
      `[data-slr2toggle="${iconObj.name}"]`
    );

    elems.forEach((elem) => {
      if (!elem.classList.contains('slr2--component-loaded')) {
        //делаем элемент видимым и кликабельным
        elem.classList.add('slr2--component-loaded');
        //обрабатываем клик
        elem.addEventListener('click', (e) => {
          e.preventDefault();
          //вызываем метод show
          if (
            window.seller2[iconObj.component] &&
            window.seller2[iconObj.component][iconObj.method]
          ) {
            window.seller2[iconObj.component][iconObj.method]();
          }
        });
      }
    });
  }
};

document.documentElement.addEventListener('slr2NewComponentIsShown', (e) => {
  // const name = e.detail.name;
  // const w = window.seller2;
  // window.seller2.componentNames.forEach((cName) => {
  //   const componentName = `slr2${window.seller2.utils.className(
  //     cName
  //   )}Component`;
  //   if (name !== cName && w[componentName]) {
  //     w[componentName].hide();
  //   }
  // });
});

document.documentElement.addEventListener('click', (e) => {
  const w = window.seller2;

  window.seller2.componentNames.forEach((cName) => {
    const componentName = `slr2${window.seller2.utils.className(
      cName
    )}Component`;

    if (w[componentName]) {
      w[componentName].documentClick(e);
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  window.seller2.toggleButtons();
});
