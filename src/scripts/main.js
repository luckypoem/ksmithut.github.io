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

  function navbarToggle() {
    var toggleButtons = document.getElementsByClassName('navbar-toggle');

    forEach(toggleButtons, function (button, i) {
      var target = document.getElementById(button.dataset.target);
      button.onclick = function (e) {
        toggleClass(target, button.dataset.toggle);
        toggleClass(button, 'collapsed');
        return false;
      };
    });
  }

  function forEach(collection, cb) {
    for (var i in collection) {
      if (collection.hasOwnProperty(i) && i !== 'length') {
        cb(collection[i], i, collection);
      }
    }
  }

  function addClass(node, className) {
    var classes = getClasses(node);
    if (!hasClass(node, className)) {
      classes.push(className);
      setClasses(node, classes);
    }
  }

  function removeClass(node, className) {
    var classes  = getClasses(node);
    var classPos = classes.indexOf(className);
    if (classPos !== -1) {
      classes.splice(classPos, 1);
      setClasses(node, classes);
    }
  }

  function toggleClass(node, className) {
    var method = hasClass(node, className) ? removeClass : addClass;
    method(node, className);
  }

  function hasClass(node, className) {
    return getClasses(node).indexOf(className) !== -1;
  }

  function getClasses(node) {
    return node.className.split(' ');
  }

  function setClasses(node, classesArray) {
    node.className = classesArray.join(' ');
  }

  domReady(window, function () {
    fastclick();
    navbarToggle();
  });

})(window);
