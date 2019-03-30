// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script/ClickNavigation.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var ClickNavigator =
/** @class */
function () {
  /**
   * @param _parentContainer parent of elements to navigate on click
   * @param _customContainerNavigableClassname class of navigation container
   * @param _timer if true, imageNavigation is automatic with time
   * */
  function ClickNavigator(_parentContainer, _customContainerNavigableClassname, _timer) {
    if (_customContainerNavigableClassname === void 0) {
      _customContainerNavigableClassname = "is-navigable";
    }

    if (_timer === void 0) {
      _timer = false;
    }

    var _this = this;

    this._parentContainer = _parentContainer;
    this._customContainerNavigableClassname = _customContainerNavigableClassname;
    this._timer = _timer;
    this.DEFAULT_AUTO_SLIDE_TIMER = 2;
    this._currentIndex = 0;
    this.arrayOfElement = getDirectChildrenHTMLElements(_parentContainer.childNodes);

    if (this.arrayOfElement.length > 1) {
      _parentContainer.classList.add(_customContainerNavigableClassname);

      if (!_timer) {
        var leftAndRightElements = ClickNavigator.createLeftRightNavigationElements(_parentContainer, _customContainerNavigableClassname);
        leftAndRightElements.left.addEventListener("click", function () {
          _this.currentIndex = _this._currentIndex - 1;
        });
        leftAndRightElements.right.addEventListener("click", function () {
          _this.currentIndex = _this._currentIndex + 1;
        }); // _parentContainer.addEventListener("click", () => {
        //   this.currentIndex = this._currentIndex + 1
        // });
      } else {
        this.setTimerImageNavigation();
      }

      this.setElementStatus();
    }
  }

  Object.defineProperty(ClickNavigator.prototype, "currentIndex", {
    set: function set(value) {
      if (value > this.arrayOfElement.length - 1) {
        value = 0;
      } else if (value < 0) {
        value = this.arrayOfElement.length - 1;
      }

      if (this._timer) this.setTimerImageNavigation();
      this._currentIndex = value;
      this.setElementStatus();
    },
    enumerable: true,
    configurable: true
  });

  ClickNavigator.createLeftRightNavigationElements = function (parentContainer, customContainerNavigableClassname) {
    var leftElement = document.createElement("div");
    var rightElement = document.createElement("div");
    leftElement.className = "l-left";
    rightElement.className = "l-right";
    setClickNavigationElements(leftElement, rightElement, parentContainer);
    parentContainer.appendChild(leftElement);
    parentContainer.appendChild(rightElement);
    return {
      left: leftElement,
      right: rightElement
    };
  };

  ClickNavigator.prototype.setTimerImageNavigation = function () {
    var _this = this;

    var element = this.arrayOfElement[this._currentIndex];
    var timer = parseInt(element.dataset.timer);
    if (isNaN(timer)) timer = this.DEFAULT_AUTO_SLIDE_TIMER;
    setTimeout(function () {
      _this.currentIndex = _this._currentIndex + 1;
    }, timer * 1000);
  };

  ClickNavigator.prototype.setElementStatus = function () {
    for (var index = 0; index < this.arrayOfElement.length; index++) {
      var element = this.arrayOfElement[index];

      if (index === this._currentIndex) {
        element.classList.add("current");
      } else {
        element.classList.remove("current");
      }
    }
  };

  return ClickNavigator;
}();

exports["default"] = ClickNavigator;

function getDirectChildrenHTMLElements(parentElement) {
  var arrayOfElementToNavigate = [];

  for (var i in parentElement) {
    var element = parentElement[i];

    if (element instanceof HTMLElement) {
      arrayOfElementToNavigate.push(element);
    }
  }

  return arrayOfElementToNavigate;
}

function setClickNavigationElements(leftElement, rightElement, container) {
  var cStyle = container.style;
  cStyle.position = "relative";
  var lStyl = leftElement.style;
  lStyl.width = "50%";
  lStyl.height = "100%";
  lStyl.position = "absolute";
  lStyl.top = "0";
  lStyl.left = "0";
  var rStl = rightElement.style;
  rStl.width = "50%";
  rStl.height = "100%";
  rStl.position = "absolute";
  rStl.top = "0";
  rStl.right = "0";
}
},{}],"script/_initClickNavigationOnProjectImages.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var ClickNavigation_1 = __importDefault(require("./ClickNavigation"));

function default_1() {
  var imageSlideContainers = document.querySelectorAll(".l-images-slide:not(.is-auto)");

  for (var i in imageSlideContainers) {
    var element = imageSlideContainers[i];

    if (element instanceof HTMLElement) {
      new ClickNavigation_1["default"](element);
    }
  }
}

exports["default"] = default_1;
},{"./ClickNavigation":"script/ClickNavigation.ts"}],"script/_initAutomaticTimerImageNavigation.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var ClickNavigation_1 = __importDefault(require("./ClickNavigation"));

function default_1() {
  var imageTimerContainers = document.querySelectorAll(".l-images-slide.is-auto");

  for (var i in imageTimerContainers) {
    var element = imageTimerContainers[i];

    if (element instanceof HTMLElement) {
      new ClickNavigation_1["default"](element, "is-navigable", true);
    }
  }
}

exports["default"] = default_1;
},{"./ClickNavigation":"script/ClickNavigation.ts"}],"script/HeaderDescription.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var HeaderDescription =
/** @class */
function () {
  function HeaderDescription(_descriptionContainer, _elementToPutDescription, _onMouseEnter) {
    this._descriptionContainer = _descriptionContainer;
    this._elementToPutDescription = _elementToPutDescription;
    this._onMouseEnter = _onMouseEnter;
    this._DESCRIPTION_ELEMENT_QUERY_SELECTOR = ".l-images-container__description";
    this._descriptionElement = null;

    var descriptionElement = _descriptionContainer.querySelector(this._DESCRIPTION_ELEMENT_QUERY_SELECTOR);

    if (descriptionElement instanceof HTMLElement) {
      this._descriptionElement = descriptionElement;
      this.setThisDescriptionPutToElementEvent();
    }
  }

  Object.defineProperty(HeaderDescription.prototype, "HTMLDescription", {
    get: function get() {
      return this._descriptionElement.innerHTML;
    },
    enumerable: true,
    configurable: true
  });

  HeaderDescription.prototype.setThisDescriptionPutToElementEvent = function () {
    var _this_1 = this;

    this._descriptionContainer.addEventListener("mouseenter", function () {
      _this_1._onMouseEnter(_this_1);
    });
  };

  return HeaderDescription;
}();

exports["default"] = HeaderDescription;
},{}],"../node_modules/@azertypow/vertical-text-scrolling/src/cssStyle.ts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// language=CSS
exports.cssStyle = "\n  .vts.vts--is-repeat {\n      display: flex;\n  }\n  \n  .vts__text-to-scroll {\n      animation: vts__text-scroll-animation 30s infinite linear;\n  }\n  \n  .vts--is-repeat .vts__text-to-scroll {\n      animation: vts__text-scroll-animation--repeat-first 30s infinite linear;\n  }\n\n  .vts__new-container {\n      white-space: nowrap;\n  }\n  \n  .vts__new-container > * {\n      white-space: normal;\n  }\n\n  .vts__new-container.vts__text-to-scroll {\n      display: flex;\n  }\n\n  .vts--is-repeat .vts__new-container {\n      flex-shrink: 0;\n  }\n\n  /* simple text scrolling animation*/\n  @keyframes vts__text-scroll-animation {\n      0% {\n          transform: translateX(100%);\n      }\n\n      100% {\n          transform: translateX(-100%);\n      }\n  }\n  \n  /* repeat text scrolling animation */\n  @keyframes vts__text-scroll-animation--repeat-first {\n      0% {\n          transform: translateX(0%);\n      }\n      \n      100% {\n          transform: translateX(-100%);\n      }\n  }\n";

},{}],"../node_modules/@azertypow/vertical-text-scrolling/src/setAnimation.ts":[function(require,module,exports) {
"use strict";
/**
 * @param element HTMLElement to scroll
 * @param speed speed for scrolling text, in ms unit
 * @param scrollElementClassName class name for scrolling HTMLElement
 * @param textRepeat, repeat text scrolling option
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(element, speed, scrollElementClassName, textRepeat) {
    if (textRepeat === void 0) { textRepeat = false; }
    element.classList.add(scrollElementClassName);
    var d = element.getBoundingClientRect().width;
    if (textRepeat)
        speed = speed * 2;
    element.style.animationDuration = d / speed + "s";
    if (textRepeat) {
        var parentContainer = element.parentElement;
        var copyOfElementToAnimate = element.cloneNode(true);
        parentContainer.appendChild(copyOfElementToAnimate);
        copyOfElementToAnimate.classList.add("copy");
    }
}
exports.default = default_1;

},{}],"../node_modules/@azertypow/vertical-text-scrolling/src/textToScroll.ts":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cssStyle_1 = require("./cssStyle");
var setAnimation_1 = __importDefault(require("./setAnimation"));
var PARENT_CONTAINER_CLASSNAME = "vts";
var PARENT_CONTAINER_IS_REPEAT_CLASSNAME = "vts--is-repeat";
var ELEMENT_TO_SCROLL_CLASSNAME = "vts__text-to-scroll";
var REPEAT_CONTAINER_CLASSNAME = "vts__new-container";
/**
 * @param element element to vertical scroll
 * @param speed scroll for element, in px/s
 * @param textRepeat at the text when it comes out on one side
 * */
function default_1(element, speed, textRepeat) {
    if (textRepeat === void 0) { textRepeat = false; }
    addAnimationStyleOnDocument();
    var elementToAnimated = element;
    var parent = element.parentElement;
    if (parent instanceof HTMLElement) {
        parent.classList.add(PARENT_CONTAINER_CLASSNAME);
        if (textRepeat) {
            if (parent.tagName !== "HTML") {
                parent.classList.add(PARENT_CONTAINER_IS_REPEAT_CLASSNAME);
                var elementWidth = element.getBoundingClientRect().width;
                var parentWidth = parent.getBoundingClientRect().width;
                var numberOfElementCanPutInParent = Math.floor(parentWidth / elementWidth);
                console.log("numberOfElementCanPutInParent: ", numberOfElementCanPutInParent, numberOfElementCanPutInParent > 0 && isFinite(numberOfElementCanPutInParent));
                if (numberOfElementCanPutInParent > 0 && isFinite(numberOfElementCanPutInParent)) {
                    var newContainerForRepeatElement = document.createElement("div");
                    newContainerForRepeatElement.className = REPEAT_CONTAINER_CLASSNAME;
                    parent.removeChild(element);
                    for (var i = 0; i < numberOfElementCanPutInParent; i++) {
                        newContainerForRepeatElement.appendChild(element.cloneNode(true));
                    }
                    parent.appendChild(newContainerForRepeatElement);
                    elementToAnimated = newContainerForRepeatElement;
                }
                else {
                    textRepeat = false;
                }
            }
            else {
                textRepeat = false;
            }
        }
        else {
            textRepeat = false;
        }
    }
    setAnimation_1.default(elementToAnimated, speed, ELEMENT_TO_SCROLL_CLASSNAME, textRepeat);
}
exports.default = default_1;
function addAnimationStyleOnDocument() {
    var styleElement = document.createElement("style");
    styleElement.innerText = cssStyle_1.cssStyle;
    document.body.appendChild(styleElement);
}

},{"./cssStyle":"../node_modules/@azertypow/vertical-text-scrolling/src/cssStyle.ts","./setAnimation":"../node_modules/@azertypow/vertical-text-scrolling/src/setAnimation.ts"}],"script/_initDescriptionToHeaderSystem.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var HeaderDescription_1 = __importDefault(require("./HeaderDescription"));

var textToScroll_1 = __importDefault(require("@azertypow/vertical-text-scrolling/src/textToScroll"));

function default_1() {
  var currentHTMLInElementToScroll = "";
  var headerForDescription = document.querySelector(".l-site-header__text");
  var nodeListOfImageContainer = document.querySelectorAll(".l-images-container");
  var elementToScrollContainer = document.querySelector(".text-to-scroll");

  if (elementToScrollContainer instanceof HTMLElement) {
    for (var i in nodeListOfImageContainer) {
      var imageContainer = nodeListOfImageContainer[i];

      if (imageContainer instanceof HTMLElement) {
        new HeaderDescription_1["default"](imageContainer, headerForDescription, function (_this) {
          if (currentHTMLInElementToScroll !== _this.HTMLDescription) {
            currentHTMLInElementToScroll = _this.HTMLDescription;
            var elementToScroll = document.createElement("div");
            elementToScroll.innerHTML = _this.HTMLDescription;
            clearChildOfHTMLElement(elementToScrollContainer).appendChild(elementToScroll);
            textToScroll_1["default"](elementToScroll, 25, true);
          }
        });
      }
    }
  }
}

exports["default"] = default_1;

function clearChildOfHTMLElement(elementToClear) {
  var firstChildOfContainer = elementToClear.firstChild;

  while (firstChildOfContainer) {
    elementToClear.removeChild(firstChildOfContainer);
    firstChildOfContainer = elementToClear.firstChild;
  }

  return elementToClear;
}
},{"./HeaderDescription":"script/HeaderDescription.ts","@azertypow/vertical-text-scrolling/src/textToScroll":"../node_modules/@azertypow/vertical-text-scrolling/src/textToScroll.ts"}],"../node_modules/get-size/get-size.js":[function(require,module,exports) {
var define;
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

},{}],"../node_modules/ev-emitter/ev-emitter.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

},{}],"../node_modules/unipointer/unipointer.js":[function(require,module,exports) {
var define;
/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {

'use strict';

function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) {
    // Pointer Events
    startEvent = 'pointerdown';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  }
  elem[ bindMethod ]( startEvent, this );
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto._pointerReset = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

},{"ev-emitter":"../node_modules/ev-emitter/ev-emitter.js"}],"../node_modules/unidragger/unidragger.js":[function(require,module,exports) {
var define;
/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  this.pointerDownPointer = pointer;

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

},{"unipointer":"../node_modules/unipointer/unipointer.js"}],"../node_modules/draggabilly/draggabilly.js":[function(require,module,exports) {
var define;
/*!
 * Draggabilly v2.2.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'get-size/get-size',
        'unidragger/unidragger'
      ],
      function( getSize, Unidragger ) {
        return factory( window, getSize, Unidragger );
      });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size'),
      require('unidragger')
    );
  } else {
    // browser global
    window.Draggabilly = factory(
      window,
      window.getSize,
      window.Unidragger
    );
  }

}( window, function factory( window, getSize, Unidragger ) {

'use strict';

// -------------------------- helpers & variables -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function noop() {}

var jQuery = window.jQuery;

// --------------------------  -------------------------- //

function Draggabilly( element, options ) {
  // querySelector if string
  this.element = typeof element == 'string' ?
    document.querySelector( element ) : element;

  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = extend( {}, this.constructor.defaults );
  this.option( options );

  this._create();
}

// inherit Unidragger methods
var proto = Draggabilly.prototype = Object.create( Unidragger.prototype );

Draggabilly.defaults = {
};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  extend( this.options, opts );
};

// css position values that don't need to be set
var positionValues = {
  relative: true,
  absolute: true,
  fixed: true
};

proto._create = function() {
  // properties
  this.position = {};
  this._getPosition();

  this.startPoint = { x: 0, y: 0 };
  this.dragPoint = { x: 0, y: 0 };

  this.startPosition = extend( {}, this.position );

  // set relative positioning
  var style = getComputedStyle( this.element );
  if ( !positionValues[ style.position ] ) {
    this.element.style.position = 'relative';
  }

  // events, bridge jQuery events from vanilla
  this.on( 'pointerDown', this.onPointerDown );
  this.on( 'pointerMove', this.onPointerMove );
  this.on( 'pointerUp', this.onPointerUp );

  this.enable();
  this.setHandles();
};

/**
 * set this.handles and bind start events to 'em
 */
proto.setHandles = function() {
  this.handles = this.options.handle ?
    this.element.querySelectorAll( this.options.handle ) : [ this.element ];

  this.bindHandles();
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = [ event ].concat( args );
  this.emitEvent( type, emitArgs );
  this.dispatchJQueryEvent( type, event, args );
};

proto.dispatchJQueryEvent = function( type, event, args ) {
  var jQuery = window.jQuery;
  // trigger jQuery event
  if ( !jQuery || !this.$element ) {
    return;
  }
  // create jQuery event
  var $event = jQuery.Event( event );
  $event.type = type;
  this.$element.trigger( $event, args );
};

// -------------------------- position -------------------------- //

// get x/y position from style
proto._getPosition = function() {
  var style = getComputedStyle( this.element );
  var x = this._getPositionCoord( style.left, 'width' );
  var y = this._getPositionCoord( style.top, 'height' );
  // clean up 'auto' or other non-integer values
  this.position.x = isNaN( x ) ? 0 : x;
  this.position.y = isNaN( y ) ? 0 : y;

  this._addTransformPosition( style );
};

proto._getPositionCoord = function( styleSide, measure ) {
  if ( styleSide.indexOf('%') != -1 ) {
    // convert percent into pixel for Safari, #75
    var parentSize = getSize( this.element.parentNode );
    // prevent not-in-DOM element throwing bug, #131
    return !parentSize ? 0 :
      ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
  }
  return parseInt( styleSide, 10 );
};

// add transform: translate( x, y ) to position
proto._addTransformPosition = function( style ) {
  var transform = style.transform;
  // bail out if value is 'none'
  if ( transform.indexOf('matrix') !== 0 ) {
    return;
  }
  // split matrix(1, 0, 0, 1, x, y)
  var matrixValues = transform.split(',');
  // translate X value is in 12th or 4th position
  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
  var translateX = parseInt( matrixValues[ xIndex ], 10 );
  // translate Y value is in 13th or 5th position
  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
  this.position.x += translateX;
  this.position.y += translateY;
};

// -------------------------- events -------------------------- //

proto.onPointerDown = function( event, pointer ) {
  this.element.classList.add('is-pointer-down');
  this.dispatchJQueryEvent( 'pointerDown', event, [ pointer ] );
};

/**
 * drag start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragStart = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }
  this._getPosition();
  this.measureContainment();
  // position _when_ drag began
  this.startPosition.x = this.position.x;
  this.startPosition.y = this.position.y;
  // reset left/top style
  this.setLeftTop();

  this.dragPoint.x = 0;
  this.dragPoint.y = 0;

  this.element.classList.add('is-dragging');
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
  // start animation
  this.animate();
};

proto.measureContainment = function() {
  var container = this.getContainer();
  if ( !container ) {
    return;
  }

  var elemSize = getSize( this.element );
  var containerSize = getSize( container );
  var elemRect = this.element.getBoundingClientRect();
  var containerRect = container.getBoundingClientRect();

  var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
  var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

  var position = this.relativeStartPosition = {
    x: elemRect.left - ( containerRect.left + containerSize.borderLeftWidth ),
    y: elemRect.top - ( containerRect.top + containerSize.borderTopWidth )
  };

  this.containSize = {
    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height
  };
};

proto.getContainer = function() {
  var containment = this.options.containment;
  if ( !containment ) {
    return;
  }
  var isElement = containment instanceof HTMLElement;
  // use as element
  if ( isElement ) {
    return containment;
  }
  // querySelector if string
  if ( typeof containment == 'string' ) {
    return document.querySelector( containment );
  }
  // fallback to parent element
  return this.element.parentNode;
};

// ----- move event ----- //

proto.onPointerMove = function( event, pointer, moveVector ) {
  this.dispatchJQueryEvent( 'pointerMove', event, [ pointer, moveVector ] );
};

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isEnabled ) {
    return;
  }
  var dragX = moveVector.x;
  var dragY = moveVector.y;

  var grid = this.options.grid;
  var gridX = grid && grid[0];
  var gridY = grid && grid[1];

  dragX = applyGrid( dragX, gridX );
  dragY = applyGrid( dragY, gridY );

  dragX = this.containDrag( 'x', dragX, gridX );
  dragY = this.containDrag( 'y', dragY, gridY );

  // constrain to axis
  dragX = this.options.axis == 'y' ? 0 : dragX;
  dragY = this.options.axis == 'x' ? 0 : dragY;

  this.position.x = this.startPosition.x + dragX;
  this.position.y = this.startPosition.y + dragY;
  // set dragPoint properties
  this.dragPoint.x = dragX;
  this.dragPoint.y = dragY;

  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

function applyGrid( value, grid, method ) {
  method = method || 'round';
  return grid ? Math[ method ]( value / grid ) * grid : value;
}

proto.containDrag = function( axis, drag, grid ) {
  if ( !this.options.containment ) {
    return drag;
  }
  var measure = axis == 'x' ? 'width' : 'height';

  var rel = this.relativeStartPosition[ axis ];
  var min = applyGrid( -rel, grid, 'ceil' );
  var max = this.containSize[ measure ];
  max = applyGrid( max, grid, 'floor' );
  return  Math.max( min, Math.min( max, drag ) );
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.onPointerUp = function( event, pointer ) {
  this.element.classList.remove('is-pointer-down');
  this.dispatchJQueryEvent( 'pointerUp', event, [ pointer ] );
};

/**
 * drag end
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragEnd = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }
  // use top left position when complete
  this.element.style.transform = '';
  this.setLeftTop();
  this.element.classList.remove('is-dragging');
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

// -------------------------- animation -------------------------- //

proto.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) {
    return;
  }

  this.positionDrag();

  var _this = this;
  requestAnimationFrame( function animateFrame() {
    _this.animate();
  });

};

// left/top positioning
proto.setLeftTop = function() {
  this.element.style.left = this.position.x + 'px';
  this.element.style.top  = this.position.y + 'px';
};

proto.positionDrag = function() {
  this.element.style.transform = 'translate3d( ' + this.dragPoint.x +
    'px, ' + this.dragPoint.y + 'px, 0)';
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  this.dispatchEvent( 'staticClick', event, [ pointer ] );
};

// ----- methods ----- //

/**
 * @param {Number} x
 * @param {Number} y
 */
proto.setPosition = function( x, y ) {
  this.position.x = x;
  this.position.y = y;
  this.setLeftTop();
};

proto.enable = function() {
  this.isEnabled = true;
};

proto.disable = function() {
  this.isEnabled = false;
  if ( this.isDragging ) {
    this.dragEnd();
  }
};

proto.destroy = function() {
  this.disable();
  // reset styles
  this.element.style.transform = '';
  this.element.style.left = '';
  this.element.style.top = '';
  this.element.style.position = '';
  // unbind handles
  this.unbindHandles();
  // remove jQuery data
  if ( this.$element ) {
    this.$element.removeData('draggabilly');
  }
};

// ----- jQuery bridget ----- //

// required for jQuery bridget
proto._init = noop;

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'draggabilly', Draggabilly );
}

// -----  ----- //

return Draggabilly;

}));

},{"get-size":"../node_modules/get-size/get-size.js","unidragger":"../node_modules/unidragger/unidragger.js"}],"script/_initCardDraggabilly.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var draggabilly_1 = __importDefault(require("draggabilly"));

function default_1() {
  new draggabilly_1["default"](".l-draggable");
}

exports["default"] = default_1;
},{"draggabilly":"../node_modules/draggabilly/draggabilly.js"}],"script/OpenCloseElement.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var OpenCloseElement =
/** @class */
function () {
  function OpenCloseElement(_elementToOpenClose, _elementForOpen, _elementForClosed) {
    if (_elementForClosed === void 0) {
      _elementForClosed = _elementForOpen;
    }

    this._elementToOpenClose = _elementToOpenClose;
    this._elementForOpen = _elementForOpen;
    this._elementForClosed = _elementForClosed;
    this.__open = false;

    if (_elementForClosed === _elementForOpen) {
      _elementForOpen.addEventListener("click", this._setEventToggle_open.bind(this));
    } else {}
  }

  Object.defineProperty(OpenCloseElement.prototype, "_open", {
    set: function set(value) {
      // @ts-ignore: force write value
      this.__open = value;
      this._elementToOpenClose.dataset.open = value.toString();
    },
    enumerable: true,
    configurable: true
  });

  OpenCloseElement.prototype._setEventToggle_open = function () {
    this._open = !this.__open;
  };

  OpenCloseElement.prototype._setEventOpen_open = function () {};

  OpenCloseElement.prototype._setEventClose_open = function () {};

  return OpenCloseElement;
}();

exports["default"] = OpenCloseElement;
},{}],"script/_initOpenCloseContact.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var OpenCloseElement_1 = __importDefault(require("./OpenCloseElement"));

function default_1() {
  var elementToOpenClose = document.querySelector(".to-open-close");
  var elementToggleClose = document.querySelector(".is-open-toggle");
  if (elementToOpenClose instanceof HTMLElement && elementToggleClose instanceof HTMLElement) new OpenCloseElement_1["default"](elementToOpenClose, elementToggleClose);
}

exports["default"] = default_1;
},{"./OpenCloseElement":"script/OpenCloseElement.ts"}],"script/PercentMarginTopPosition.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var PercentMarginTopPosition =
/** @class */
function () {
  function PercentMarginTopPosition(_element, _topPercentPosition) {
    var _this = this;

    this._element = _element;
    this._topPercentPosition = _topPercentPosition;
    window.addEventListener("resize", function () {
      _this.setMarginTopOfElement();
    });
    this.setMarginTopOfElement();
  }

  PercentMarginTopPosition.prototype.setMarginTopOfElement = function () {
    this._element.style.marginTop = this._element.getBoundingClientRect().height / 100 * this._topPercentPosition + "px";
  };

  return PercentMarginTopPosition;
}();

exports["default"] = PercentMarginTopPosition;
},{}],"script/FileInformation.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var FileInformation =
/** @class */
function () {
  function FileInformation(_url) {
    this._url = _url;
  }

  Object.defineProperty(FileInformation.prototype, "extension", {
    get: function get() {
      return this._url.split(/\#|\?/)[0].split('.').pop().trim();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FileInformation.prototype, "fileName", {
    get: function get() {
      return this._url.split('.').slice(0, -1).join('.');
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FileInformation.prototype, "fileNameWithoutSizeInfo", {
    get: function get() {
      return this.fileName.split('@').slice(0, 1).join('@');
    },
    enumerable: true,
    configurable: true
  });
  return FileInformation;
}();

exports["default"] = FileInformation;
},{}],"script/ImageLoader.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var FileInformation_1 = __importDefault(require("./FileInformation"));

var ImageLoader =
/** @class */
function () {
  function ImageLoader(_imageContainer, onSmallImgLoaded) {
    var _this_1 = this;

    this._imageContainer = _imageContainer;
    this.image = this._imageContainer.querySelector("img");
    this.largeImgElement = document.createElement("img");
    this.imageInfo = new FileInformation_1["default"](this.image.src);

    if (this.image instanceof HTMLImageElement) {
      var imgElementForLoadedEvent = document.createElement("img");
      imgElementForLoadedEvent.addEventListener("load", function () {
        onSmallImgLoaded(_this_1);
      });
      imgElementForLoadedEvent.src = this.image.src;
      this.largeImgElement.addEventListener("load", function () {
        console.log("large image loaded");
        _this_1.largeImgElement.style.opacity = "1";
      });
      this.largeImgElement.draggable = false;
      this.largeImgElement.className = "im-large-img";
    }
  }

  ImageLoader.prototype.loadLargeImage = function () {
    this.largeImgElement.src = this.imageInfo.fileNameWithoutSizeInfo + "." + this.imageInfo.extension;

    this._imageContainer.appendChild(this.largeImgElement);
  };

  return ImageLoader;
}();

exports["default"] = ImageLoader;
},{"./FileInformation":"script/FileInformation.ts"}],"script/imageLoaderIniter.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var ImageLoader_1 = __importDefault(require("./ImageLoader"));

function default_1() {
  var nodeListOfImageContainer = document.querySelectorAll(".im-image-loader");
  var imageLoadedCounter = 0;
  var arrayOfImageLoader = [];
  nodeListOfImageContainer.forEach(function (imageContainer) {
    if (imageContainer instanceof HTMLDivElement) {
      arrayOfImageLoader.push(new ImageLoader_1["default"](imageContainer, function (_this) {
        imageLoadedCounter++;

        if (imageLoadedCounter === nodeListOfImageContainer.length) {
          allSmallImagesLoaded(arrayOfImageLoader);
        }
      }));
    } else {
      console.info("image container must be a div HTMLElement: ", imageContainer);
    }
  });
}

exports["default"] = default_1;

function allSmallImagesLoaded(arrayOfImageLoader) {
  for (var _i = 0, arrayOfImageLoader_1 = arrayOfImageLoader; _i < arrayOfImageLoader_1.length; _i++) {
    var imageLoader = arrayOfImageLoader_1[_i];
    imageLoader.loadLargeImage();
  }
}
},{"./ImageLoader":"script/ImageLoader.ts"}],"script/main.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var _initClickNavigationOnProjectImages_1 = __importDefault(require("./_initClickNavigationOnProjectImages"));

var _initAutomaticTimerImageNavigation_1 = __importDefault(require("./_initAutomaticTimerImageNavigation"));

var _initDescriptionToHeaderSystem_1 = __importDefault(require("./_initDescriptionToHeaderSystem"));

var _initCardDraggabilly_1 = __importDefault(require("./_initCardDraggabilly"));

var _initOpenCloseContact_1 = __importDefault(require("./_initOpenCloseContact"));

var PercentMarginTopPosition_1 = __importDefault(require("./PercentMarginTopPosition"));

var imageLoaderIniter_1 = __importDefault(require("./imageLoaderIniter"));

_initClickNavigationOnProjectImages_1["default"]();

_initAutomaticTimerImageNavigation_1["default"]();

_initDescriptionToHeaderSystem_1["default"]();

_initCardDraggabilly_1["default"]();

_initOpenCloseContact_1["default"]();

imageLoaderIniter_1["default"]();
var nodeListOfElementWithPercentPosition = document.querySelectorAll("[data-top]");

var _loop_1 = function _loop_1(i) {
  var elementWithPercentPosition = nodeListOfElementWithPercentPosition[i];

  if (elementWithPercentPosition instanceof HTMLElement) {
    var topPosition = parseFloat(elementWithPercentPosition.dataset.top);

    if (typeof topPosition === "number" && !isNaN(topPosition)) {
      var percentMarginTopPosition_1 = new PercentMarginTopPosition_1["default"](elementWithPercentPosition, topPosition);
      var nodeListOfImagesInPercentMarginTopPosition = elementWithPercentPosition.querySelectorAll("img");
      nodeListOfImagesInPercentMarginTopPosition.forEach(function (imageElement) {
        imageElement.addEventListener("load", function () {
          percentMarginTopPosition_1.setMarginTopOfElement();
        });
      });
    }
  }
};

for (var i in nodeListOfElementWithPercentPosition) {
  _loop_1(i);
}
},{"./_initClickNavigationOnProjectImages":"script/_initClickNavigationOnProjectImages.ts","./_initAutomaticTimerImageNavigation":"script/_initAutomaticTimerImageNavigation.ts","./_initDescriptionToHeaderSystem":"script/_initDescriptionToHeaderSystem.ts","./_initCardDraggabilly":"script/_initCardDraggabilly.ts","./_initOpenCloseContact":"script/_initOpenCloseContact.ts","./PercentMarginTopPosition":"script/PercentMarginTopPosition.ts","./imageLoaderIniter":"script/imageLoaderIniter.ts"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/normalize.css/normalize.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"style/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"../../node_modules/normalize.css/normalize.css":"../node_modules/normalize.css/normalize.css","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"app.js":[function(require,module,exports) {
"use strict";

require("./script/main");

require("./style/main.scss");
},{"./script/main":"script/main.ts","./style/main.scss":"style/main.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53175" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.js.map