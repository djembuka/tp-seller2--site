(() => {
  const componentObj = {
    name: 'slr2MenuComponent',
    message: 'Компонент меню',
    event: 'slr2MenuLoaded',
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
  }, 2000);
})();
