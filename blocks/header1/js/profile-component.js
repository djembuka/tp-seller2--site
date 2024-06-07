(() => {
  const componentObj = {
    name: 'slr2ProfileComponent',
    message: 'Компонент профиля',
    event: 'slr2ProfileLoaded',
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
