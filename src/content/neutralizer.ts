(() => {
  console.log('[Neutralizer] Running...');

  document.oncopy = null;
  document.onpaste = null;
  document.oncut = null;
  document.oncontextmenu = null;
  document.onkeydown = null;
  document.onvisibilitychange = null;
  window.onblur = null;
  window.onfocus = null;

  const noop = () => {};
  [
    'oncopy',
    'onpaste',
    'oncut',
    'onkeydown',
    'oncontextmenu',
    'onvisibilitychange',
  ].forEach((event) => {
    Object.defineProperty(document, event, {
      get: () => null,
      set: noop,
    });
  });
  ['onblur', 'onfocus'].forEach((event) => {
    Object.defineProperty(window, event, {
      get: () => null,
      set: noop,
    });
  });

  console.log('[✅ Neutralizer] Restrictions removed.');
})();
