(() => {
  const componentObj = {
    name: 'slr2BasketComponent',
    message: 'Компонент корзины',
    event: 'slr2BasketLoaded',
    method: 'show',
  };

  setTimeout(() => {
    const event = new Event(componentObj.event);
    document.documentElement.dispatchEvent(event);

    window[componentObj.name] = {};
    window[componentObj.name][componentObj.method] = function () {
      const div = document.createElement('div');
      div.textContent = componentObj.message;
      document.querySelector('body').appendChild(div);
    };

    window[componentObj.name].getCount = function () {
      return 10;
    };

    setTimeout(() => {
      const basketEvent = new CustomEvent('slr2BasketCountChanged', {
        detail: { count: 1012 },
      });
      document.documentElement.dispatchEvent(basketEvent);
    }, 1000);
  }, 2000);
})();
