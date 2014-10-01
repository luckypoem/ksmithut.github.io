(function (window) {

  //https://github.com/dperini/ContentLoaded/blob/master/src/contentloaded.js
  function domReady(win, fn) {
    var done   = false;
    var top    = true;
    var doc    = win.document;
    var root   = doc.documentElement;
    var modern = doc.addEventListener;
    var add    = modern ? 'addEventListener' : 'attachEvent';
    var rem    = modern ? 'removeEventListener' : 'detachEvent';
    var pre    = modern ? '' : 'on';

    function init(e) {
      if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
        return;
      }
      (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) { fn.call(win, e.type || e); }
    }

    function poll() {
      try { root.doScroll('left'); }
      catch (e) { setTimeout(poll, 50); return; }
      init('poll');
    }

    if (doc.readyState === 'complete') { fn.call(win, 'lazy'); return; }
    if (!modern && root.doScroll) {
      try { top = !win.frameElement; } catch (e) {}
      if (top) { poll(); }
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }

  function fastclick(elem) {
    if (!window.FastClick) { return; }
    elem = elem || window.document.body;
    window.FastClick.attach(elem);
  }

  domReady(window, function () {
    fastclick();
  });

})(window);
