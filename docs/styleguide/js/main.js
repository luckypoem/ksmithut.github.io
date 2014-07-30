(function () {
  /* jshint maxstatements: false */
  // http://webdesign.tutsplus.com/articles/implementing-the-float-label-form-pattern--webdesign-16407
  // Set up our checkers for feature support in the browser
  var supports = {
    placeholder: 'placeholder' in document.createElement('input'),
    querySelectorAll: Boolean(document.querySelectorAll)
  };

  // Float Label Form Pattern Plugin
  // ===============================
  //
  // This plugin addresses a problem with form usability. Personally, I think
  // using the placeholder attribute in form elements is great (when it's
  // supported). The problem it introduces is that once you have data in the
  // field, you don't have any way of knowing what the input is for except by
  // the context of the data or if you remove the data. And it's not supported
  // in older browsers. So you pretty much have to use the label anyway, but if
  // you use both, it looks tacky because you have the label displayed twice.
  //
  // This plugin uses the usability of placeholders while using the label once
  // the user has input data into the field.
  //
  // To initialize:
  //
  //     floatingLabel.init(options);
  //
  // Where options is an object hash with options. The default options are as
  // follows:
  //
  //     {
  //       formGroupSelector: '.form-group',
  //       hideLabelClass: 'js-hide-label',
  //       unhighlightClass: 'js-unhighlight-label'
  //     }
  var floatingLabel = {
    init: function (options) {
      if (!supports.querySelectorAll || !supports.placeholder) { return; }

      var invalidTypes = [
        'checkbox',
        'radio',
        'button',
        'submit'
      ];

      options = tools.defaults(options, {
        formGroupSelector: '.form-group',
        hideLabelClass: 'js-hide-label',
        highlightClass: 'js-highlight-label'
      });

      // get the form groups on the page
      var formGroups = document.querySelectorAll(options.formGroupSelector);
      var formGroupsLength = formGroups.length;

      // Iterate through the formGroups to attach the events to the form
      // elements
      for (var i = 0; i < formGroupsLength; ++i) {
        iterateFormGroup(formGroups[i]);
      }

      // iterateFormGroup
      // ----------------
      function iterateFormGroup(formGroup) {
        // Add the hide class to the label

        // get the required elements
        var input  = formGroup.querySelectorAll('input, textarea');
        var label  = formGroup.querySelectorAll('label');
        var labelText = label[0] ? label[0].textContent : null;

        if (!labelText) { return; }

        if (input[0]) {
          input = input[0];
          // if it's any of the following
          if (invalidTypes.indexOf(input.type) !== -1) { return; }

          input.placeholder = labelText;
          input.onkeyup     = inputKeyUp;
          input.onblur      = inputBlur;
          input.onfocus     = inputFocus;

          // Set the label display to none initially, then remove the style.
          // This is so we don't cause a flash of the label hiding
          label[0].style.display = 'none';
          setTimeout(function () {
            label[0].style.display = '';
          }, 500);

          tools.addClass(formGroup, options.hideLabelClass);
        }
      }

      // inputKeyUp
      // ----------
      function inputKeyUp() {
        var parent = this.parentNode;
        if (!this.value) {
          tools.addClass(parent, options.hideLabelClass);
        } else {
          tools.removeClass(parent, options.hideLabelClass);
        }
      }

      // inputBlur
      // ---------
      function inputBlur() {
        var parent = this.parentNode;
        if (!this.value) {
          tools.addClass(parent, options.hideLabelClass);
        } else {
          tools.removeClass(parent, options.hideLabelClass);
        }
        tools.removeClass(parent, options.highlightClass);
      }

      // inputFocus
      // ----------
      function inputFocus() {
        var parent = this.parentNode;
        tools.addClass(parent, options.highlightClass);
      }
    }
  };

  // Tools
  // =====
  //
  // Here are some tools that help do some common tasks like adding and removing
  // classes from an element and setting default options.
  var tools = {

    // tools.getClasses(node)
    // ----------------------
    //
    // Gets the classes of an element in the form of an array
    //
    // ### Parameters
    //
    // * (node) HTMLElement - the html element to get the classes from
    getClasses: function (node) {
      var className = node.className || '';
      return className.split(' ');
    },

    // tools.setClasses(node)
    // ----------------------
    //
    // Sets the classes of an element given an array
    //
    // ### Parameters
    //
    // * (node) HTMLElement - the html element to set the classes
    // * (classes) Array - the classes to set to the node
    setClasses: function (node, classes) {
      classes = classes || [];
      node.className = classes.join(' ');
    },

    // tools.addClass(node, classToAdd)
    // --------------------------------
    //
    // Adds a class to an HTML Element
    //
    // ### Parameters
    //
    // * (node) HTMLElement - the html element to add the class to
    // * (classToAdd) String - the class to add to the node
    addClass: function (node, classToAdd) {
      var classes  = tools.getClasses(node);
      var hasClass = classes.indexOf(classToAdd) !== -1;
      if (!hasClass) {
        classes.push(classToAdd);
        tools.setClasses(node, classes);
      }
    },

    // tools.removeClass(node, classToRemove)
    // --------------------------------------
    //
    // Removes a class from an HTML Element
    //
    // ### Parameters
    //
    // * (node) HTMLElement - the html element to from the class from
    // * (classToRemove) String - the class to remove from the node
    removeClass: function (node, classToRemove) {
      var classes  = tools.getClasses(node);
      var position = classes.indexOf(classToRemove);
      var hasClass = position !== -1;
      if (hasClass) {
        classes.splice(position, 1);
        tools.setClasses(node, classes);
      }
    },

    // tools.defaults(dest, source)
    // ----------------------------
    //
    // Sets the default property values for an object
    //
    // ### Parameters
    //
    // * (dest) Object - The object with the user given options
    // * (source) Object - The object with the default values
    //
    // ### Returns
    //
    // * (dest) Object - The resulting object with the defaults where the
    // destination object had properties undefined
    defaults: function (dest, source) {
      dest = dest || {};
      for (var key in source) {
        if (source.hasOwnProperty(key) && typeof dest[key] === 'undefined') {
          dest[key] = source[key];
        }
      }
      return dest;
    }
  };

  // ready
  // =====
  //
  // This is the content loader used by popular libraries such as jQuery,
  // except it wasn't the jQuery team to developed it. This guy deverves the
  // credit
  // https://github.com/dperini/ContentLoaded/blob/master/src/contentloaded.js
  //
  // contentloaded.js
  //
  // Author: Diego Perini (diego.perini at gmail.com)
  // Summary: cross-browser wrapper for DOMContentLoaded
  // Updated: 20101020
  // License: MIT
  // Version: 1.2
  //
  // URL:
  // http://javascript.nwbox.com/ContentLoaded/
  // http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
  //
  // @win window reference
  // @fn function reference
  function ready(win, fn) {
    /* jshint maxcomplexity: false */

    var done = false, top = true,

    doc = win.document, root = doc.documentElement,

    add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
    rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
    pre = doc.addEventListener ? '' : 'on',

    init = function(e) {
      if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
        return;
      }
      (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) { fn.call(win, e.type || e); }
    },

    poll = function() {
      try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
      init('poll');
    };

    if (doc.readyState === 'complete') { fn.call(win, 'lazy'); }
    else {
      if (doc.createEventObject && root.doScroll) {
        try { top = !win.frameElement; } catch(e) { }
        if (top) { poll(); }
      }
      doc[add](pre + 'DOMContentLoaded', init, false);
      doc[add](pre + 'readystatechange', init, false);
      win[add](pre + 'load', init, false);
    }

  }

  // Initialization
  // ==============
  ready(window, function () {
    floatingLabel.init();
  });
})();
