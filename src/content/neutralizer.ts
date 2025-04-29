(() => {
  console.log('[Neutralizer] Activated – countermeasures engaged.');

  // 1. Static event handler nullification
  document.oncopy = null;
  document.onpaste = null;
  document.oncut = null;
  document.oncontextmenu = null;
  document.onkeydown = null;
  document.onvisibilitychange = null;
  window.onblur = null;
  window.onfocus = null;

  const noop = () => {};

  // 2. Object.defineProperty protection against reassignment
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
      configurable: true,
    });
  });

  ['onblur', 'onfocus'].forEach((event) => {
    Object.defineProperty(window, event, {
      get: () => null,
      set: noop,
      configurable: true,
    });
  });

  // 3. Intercept addEventListener to silently ignore specific restrictions
  const blockedEvents = new Set([
    'copy',
    'paste',
    'cut',
    'contextmenu',
    'keydown',
    'visibilitychange',
    'blur',
    'focus',
  ]);

  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (blockedEvents.has(type)) {
      console.log(`[Neutralizer] addEventListener blocked for: ${type}`);
      return;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };

  // 4. Patch execCommand (used in legacy clipboard control)
  try {
    document.execCommand = () => true;
    console.log('[Neutralizer] Patched execCommand.');
  } catch {}

  // 5. Patch clipboard read/write API
  if (navigator.clipboard) {
    try {
      navigator.clipboard.writeText = async () => {};
      navigator.clipboard.readText = async () => '';
      console.log('[Neutralizer] Patched navigator.clipboard.');
    } catch {}
  }

  // 6. Watch for suspicious overlays (high z-index + full-screen dims)
  const blockSuspiciousOverlays = () => {
    const nodes = document.querySelectorAll<HTMLElement>('body *');
    nodes.forEach((el) => {
      const style = getComputedStyle(el);
      const zIndex = parseInt(style.zIndex || '0', 10);
      const isFullOverlay =
        zIndex > 999 &&
        (el.offsetHeight >= window.innerHeight * 0.9 ||
          el.offsetWidth >= window.innerWidth * 0.9) &&
        style.position === 'fixed' &&
        style.backgroundColor !== 'transparent';

      if (isFullOverlay) {
        el.style.display = 'none';
        console.log('[Neutralizer] Blocked suspicious overlay element:', el);
      }
    });
  };

  setInterval(blockSuspiciousOverlays, 1500);

  console.log('[✅ Neutralizer] All restrictions removed.');
})();
