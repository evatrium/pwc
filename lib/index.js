'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var util = require('@iosio/util');
var preact = require('preact');

var d = document,
    TEST_ENV = undefined === 'test',

/**
 * creates a single style sheet. returns a function to add to the same sheet
 * @returns {function} for adding styles to the same stylesheet
 */
styleSheet = function styleSheet(style) {
  style = d.createElement('style');
  d.head.appendChild(style);
  return function (css) {
    return style.appendChild(d.createTextNode(css)), style;
  };
},
    globalStyles = styleSheet(),
    visibilityStyleSheet = styleSheet(),
    webComponentVisibility = function webComponentVisibility(tag) {
  return visibilityStyleSheet("".concat(tag, " {visibility:hidden}"));
},

/**
 * for parsing the incoming attributes into consumable props
 * @param value
 * @param type
 * @returns {{error: boolean, value: *}}
 */
formatType = function formatType(value, type) {
  type = type || String;

  try {
    if (type == Boolean) value = [true, 1, "", "1", "true"].includes(value);else if (typeof value == "string") {
      value = type == Number ? Number(value) : type == Object || type == Array ? JSON.parse(value) : value;
    }
    if ({}.toString.call(value) == "[object ".concat(type.name, "]")) return {
      value: value,
      error: type == Number && Number.isNaN(value)
    };
  } catch (e) {}

  return {
    value: value,
    error: true
  };
},

/**
 * will set or remove the attribute based on the truthyness of the value.
 * if the type of value === object (accounts for array) and the node is a custom pwc, it will json stringify the value
 * @param node
 * @param attr
 * @param value
 */
updateAttribute = function updateAttribute(node, attr, value) {
  value === null || value === false ? node.removeAttribute(attr) : node.setAttribute(attr, util.isObj(value) || util.isArray(value) ? JSON.stringify(value) : value);
},
    propToAttr = function propToAttr(prop) {
  return prop.replace(/([A-Z])/g, "-$1").toLowerCase();
},
    attrToProp = function attrToProp(attr) {
  return attr.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};

visibilityStyleSheet(" .___ {visibility: inherit;}", true);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var PROPS = Symbol(),
    IGNORE_ATTR = Symbol(),
    context = {},
    pwc = function pwc(tag, component, propTypes) {
  var _class, _temp;

  webComponentVisibility(tag);
  customElements.define(tag, (_temp = _class =
  /*#__PURE__*/
  function (_PWC) {
    _inherits(_class, _PWC);

    function _class() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _this.render = function (props) {
        return preact.h(component, props);
      };

      return _this;
    }

    return _class;
  }(PWC), _class.propTypes = component.propTypes || propTypes, _temp));
  return function (props) {
    return preact.h(tag, props, props.children);
  };
},
    x = function x(t, c, p) {
  return pwc('x-' + t, c, p);
};

var PWC =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(PWC, _HTMLElement);

  //easier theming
  function PWC() {
    var _this2;

    _classCallCheck(this, PWC);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(PWC).call(this));
    _this2.context = context;

    _this2.update = function () {
      if (!_this2._process) {
        _this2._process = _this2._mounted.then(function (_) {
          preact.render(_this2.render(util.extend({
            host: _assertThisInitialized(_this2)
          }, _this2[PROPS])), _this2._root);
          !_this2._hasMounted && !TEST_ENV && requestAnimationFrame(function () {
            return _this2.classList.add('___');
          });
          _this2._hasMounted = true;
          _this2._process = false;
        });
      }

      return _this2._process;
    };

    _this2.emit = function (name, detail, from) {
      return (from || _assertThisInitialized(_this2)).dispatchEvent(new CustomEvent(name, {
        detail: detail,
        bubbles: true,
        composed: true
      }));
    };

    _this2._root = _this2.attachShadow({
      mode: 'open'
    }); //  (this.shadowRoot || this) maybe eventually include the option to not use shadowDom

    _this2[PROPS] = {};
    _this2._mounted = new Promise(function (mount) {
      return _this2._mount = mount;
    });

    _this2.update();

    var _initAttrs = _this2.constructor._initAttrs;
    var length = _initAttrs.length;

    while (length--) {
      _initAttrs[length](_assertThisInitialized(_this2));
    }

    return _this2;
  }
  /*
   adding visibility inherit on next tick after (inspired by stencil.js)
   will prevent flash of un-styled content (common complaint with web components).
   Removing this functionality during testing makes life easier
  */


  _createClass(PWC, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      !this._hasMounted && this._mount();
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attr, oldValue, newValue) {
      if (attr === this[IGNORE_ATTR] || oldValue === newValue) return;
      this[attrToProp(attr)] = newValue;
    }
    /*
        inspired by atomico
        converts attributes to props as defined in the static propTypes.
        defers the upgrading of the attributes till mounted, ignoring them to avoid re-rendering
    */

  }, {
    key: "disconnectedCallback",

    /*  web components may call disconnected callback when the node is just being moved.
        for example, if a user manually relocates the web component in the dom via something like node.insertBefore ...
        so checking if the web component is still connected is necessary  */
    value: function disconnectedCallback() {
      !this.isConnected && preact.render(function () {
        return null;
      }, this._root);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      var _this3 = this;

      var propTypes = this.propTypes,
          prototype = this.prototype;
      this._initAttrs = [];
      if (!propTypes) return [];
      return Object.keys(propTypes).map(function (prop) {
        var attr = propToAttr(prop),
            schema = propTypes[prop].name ? {
          type: propTypes[prop]
        } : propTypes[prop];

        if (!(prop in prototype)) {
          util.def(prototype, prop, {
            get: function get() {
              return this[PROPS][prop];
            },
            set: function set(nextValue) {
              var _this4 = this;

              var _formatType = formatType(nextValue, schema.type),
                  value = _formatType.value,
                  error = _formatType.error;

              if (error && value != null) throw "[".concat(prop, "] must be type [").concat(schema.type.name, "]");
              if (value === this[PROPS][prop]) return;

              if (schema.reflect) {
                this._mounted.then(function () {
                  _this4[IGNORE_ATTR] = attr;
                  updateAttribute(_this4, attr, schema.type === Boolean && !value ? null : value);
                  _this4[IGNORE_ATTR] = false;
                });
              }

              this[PROPS][prop] = value;
              this.update();
            }
          });
        }

        schema.value && _this3._initAttrs.push(function (self) {
          return self[prop] = schema.value;
        });
        return attr;
      });
    }
  }]);

  return PWC;
}(_wrapNativeSuper(HTMLElement));

exports.context = context;
exports.globalStyles = globalStyles;
exports.pwc = pwc;
exports.x = x;
//# sourceMappingURL=index.js.map
