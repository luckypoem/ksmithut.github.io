(function (document) {
  'use strict';

  /**
   * creates fallback for svg images
   * @see http://css-tricks.com/test-support-svg-img/
   */
  var hasSvgSupport = document.implementation
    .hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');

  // Check for svg support. We don't need this javascript if svg is supported
  if (hasSvgSupport) { return; }

  var images = document.getElementsByTagName('img'); // Get all images
  var imagesLength = images.length; // Get images length once
  var i = 0; // iterator for images

  for (i; i < imagesLength; i+=1) {
    if (images[i].src.indexOf('.svg') !== -1) {
      images[i].src = images[i].src.replace('.svg', '.png');
    }
  }

})(document);
