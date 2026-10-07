(function () {
  if (window.__singleTapFix) return;
  window.__singleTapFix = true;

  var st0 = document.createElement('style');
  st0.textContent = 'html,body,button,a,label,.card,.granth-card,.dash-card,.stat-item,.pill,[role="button"]{touch-action:manipulation}';
  document.head.appendChild(st0);

  var SEL = 'button,a[href],[role="button"],input[type="button"],input[type="submit"],label,summary,.card,.granth-card,.dash-card,.stat-item,.pill,[onclick]';
  var MOVE = 10, MAXMS = 700, WAIT = 70, GUARD = 450;
  var st = null, timer = 0, lastNative = 0, lastSynth = 0, synthing = false;

  document.addEventListener('click', function (e) {
    if (synthing) return;
    var now = Date.now();
    if (now - lastSynth < GUARD) { e.stopImmediatePropagation(); e.preventDefault(); return; }
    lastNative = now;
  }, true);

  document.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { st = null; return; }
    var t = e.touches[0];
    st = { x: t.clientX, y: t.clientY, t: Date.now(), moved: false };
  }, { capture: true, passive: true });

  document.addEventListener('touchmove', function (e) {
    if (!st || !e.touches.length) return;
    var t = e.touches[0];
    if (Math.abs(t.clientX - st.x) > MOVE || Math.abs(t.clientY - st.y) > MOVE) st.moved = true;
  }, { capture: true, passive: true });

  document.addEventListener('touchcancel', function () { st = null; }, true);

  document.addEventListener('touchend', function (e) {
    var s = st; st = null;
    if (!s || s.moved || e.defaultPrevented) return;
    if (Date.now() - s.t > MAXMS) return;
    var before = lastNative, x = s.x, y = s.y;
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (lastNative !== before) return;
      var el = document.elementFromPoint(x, y);
      if (!el || !el.closest) return;
      if (el.closest('input,textarea,select,[contenteditable="true"],.scroll-rail')) return;
      var target = el.closest(SEL);
      if (!target || target.disabled) return;
      lastSynth = Date.now();
      synthing = true;
      try { target.click(); } finally { synthing = false; }
    }, WAIT);
  }, { capture: true, passive: true });
})();
