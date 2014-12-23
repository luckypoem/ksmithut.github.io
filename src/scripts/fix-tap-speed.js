(function (window) {
  'use strict';

  /**
   * fixes the 300ms tap even delay on mobile devices.
   * @see https://github.com/ftlabs/fastclick
   */
  var FastClick = window.FastClick;
  if (!FastClick) { return console.warn('FastClick is not available'); }
  FastClick.attach(document.body);

})(this);
