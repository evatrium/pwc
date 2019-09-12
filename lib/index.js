'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

var r = function r(_r, e, t) {
  return Object.defineProperty(_r, e, t);
},
    e = Array.isArray,
    t = function t(r) {
  return "object" == _typeof(r) && r instanceof Object;
};

function c(r, e) {
  for (var _t in e) {
    r[_t] = e[_t];
  }

  return r;
}

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
  value === null || value === false ? node.removeAttribute(attr) : node.setAttribute(attr, t(value) || e(value) ? JSON.stringify(value) : value);
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

var n,
    u,
    t$1,
    i,
    r$1,
    o,
    f = {},
    e$1 = [],
    c$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;

function s(n, l) {
  for (var u in l) {
    n[u] = l[u];
  }

  return n;
}

function a(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function h(n, l, u) {
  var t,
      i,
      r,
      o,
      f = arguments;
  if (l = s({}, l), arguments.length > 3) for (u = [u], t = 3; t < arguments.length; t++) {
    u.push(f[t]);
  }
  if (null != u && (l.children = u), null != n && null != n.defaultProps) for (i in n.defaultProps) {
    void 0 === l[i] && (l[i] = n.defaultProps[i]);
  }
  return o = l.key, null != (r = l.ref) && delete l.ref, null != o && delete l.key, v(n, l, o, r);
}

function v(l, u, t, i) {
  var r = {
    type: l,
    props: u,
    key: t,
    ref: i,
    __k: null,
    __p: null,
    __b: 0,
    __e: null,
    l: null,
    __c: null,
    constructor: void 0
  };
  return n.vnode && n.vnode(r), r;
}

function y(n) {
  return n.children;
}

function d$1(n) {
  if (null == n || "boolean" == typeof n) return null;
  if ("string" == typeof n || "number" == typeof n) return v(null, n, null, null);

  if (null != n.__e || null != n.__c) {
    var l = v(n.type, n.props, n.key, null);
    return l.__e = n.__e, l;
  }

  return n;
}

function m(n, l) {
  this.props = n, this.context = l;
}

function w(n, l) {
  if (null == l) return n.__p ? w(n.__p, n.__p.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) {
    if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  }

  return "function" == typeof n.type ? w(n) : null;
}

function g(n) {
  var l, u;

  if (null != (n = n.__p) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;
        break;
      }
    }

    return g(n);
  }
}

function k(l) {
  (!l.__d && (l.__d = !0) && 1 === u.push(l) || i !== n.debounceRendering) && (i = n.debounceRendering, (n.debounceRendering || t$1)(_));
}

function _() {
  var n;

  for (u.sort(function (n, l) {
    return l.__v.__b - n.__v.__b;
  }); n = u.pop();) {
    n.__d && n.forceUpdate(!1);
  }
}

function b(n, l, u, t, i, r, o, c, s) {
  var h,
      v,
      p,
      y,
      d,
      m,
      g,
      k = u && u.__k || e$1,
      _ = k.length;
  if (c == f && (c = null != r ? r[0] : _ ? w(u, 0) : null), h = 0, l.__k = x(l.__k, function (u) {
    if (null != u) {
      if (u.__p = l, u.__b = l.__b + 1, null === (p = k[h]) || p && u.key == p.key && u.type === p.type) k[h] = void 0;else for (v = 0; v < _; v++) {
        if ((p = k[v]) && u.key == p.key && u.type === p.type) {
          k[v] = void 0;
          break;
        }

        p = null;
      }

      if (y = $(n, u, p = p || f, t, i, r, o, null, c, s), (v = u.ref) && p.ref != v && (g || (g = [])).push(v, u.__c || y, u), null != y) {
        if (null == m && (m = y), null != u.l) y = u.l, u.l = null;else if (r == p || y != c || null == y.parentNode) {
          n: if (null == c || c.parentNode !== n) n.appendChild(y);else {
            for (d = c, v = 0; (d = d.nextSibling) && v < _; v += 2) {
              if (d == y) break n;
            }

            n.insertBefore(y, c);
          }

          "option" == l.type && (n.value = "");
        }
        c = y.nextSibling, "function" == typeof l.type && (l.l = y);
      }
    }

    return h++, u;
  }), l.__e = m, null != r && "function" != typeof l.type) for (h = r.length; h--;) {
    null != r[h] && a(r[h]);
  }

  for (h = _; h--;) {
    null != k[h] && D(k[h], k[h]);
  }

  if (g) for (h = 0; h < g.length; h++) {
    A(g[h], g[++h], g[++h]);
  }
}

function x(n, l, u) {
  if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));else if (Array.isArray(n)) for (var t = 0; t < n.length; t++) {
    x(n[t], l, u);
  } else u.push(l ? l(d$1(n)) : n);
  return u;
}

function C(n, l, u, t, i) {
  var r;

  for (r in u) {
    r in l || N(n, r, null, u[r], t);
  }

  for (r in l) {
    i && "function" != typeof l[r] || "value" === r || "checked" === r || u[r] === l[r] || N(n, r, l[r], u[r], t);
  }
}

function P(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === c$1.test(l) ? u + "px" : u || "";
}

function N(n, l, u, t, i) {
  var r, o, f, e, c;
  if ("key" === (l = i ? "className" === l ? "class" : l : "class" === l ? "className" : l) || "children" === l) ;else if ("style" === l) {
    if (r = n.style, "string" == typeof u) r.cssText = u;else {
      if ("string" == typeof t && (r.cssText = "", t = null), t) for (o in t) {
        u && o in u || P(r, o, "");
      }
      if (u) for (f in u) {
        t && u[f] === t[f] || P(r, f, u[f]);
      }
    }
  } else "o" === l[0] && "n" === l[1] ? (e = l !== (l = l.replace(/Capture$/, "")), c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (t || n.addEventListener(l, T, e), (n.u || (n.u = {}))[l] = u) : n.removeEventListener(l, T, e)) : "list" !== l && "tagName" !== l && "form" !== l && !i && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u ? n.removeAttribute(l) : n.setAttribute(l, u));
}

function T(l) {
  return this.u[l.type](n.event ? n.event(l) : l);
}

function $(l, u, t, i, r, o, f, e, c, a) {
  var h,
      v,
      p,
      d,
      w,
      g,
      k,
      _,
      x,
      C,
      P = u.type;

  if (void 0 !== u.constructor) return null;
  (h = n.__b) && h(u);

  try {
    n: if ("function" == typeof P) {
      if (_ = u.props, x = (h = P.contextType) && i[h.__c], C = h ? x ? x.props.value : h.__p : i, t.__c ? k = (v = u.__c = t.__c).__p = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(_, C) : (u.__c = v = new m(_, C), v.constructor = P, v.render = H), x && x.sub(v), v.props = _, v.state || (v.state = {}), v.context = C, v.__n = i, p = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && s(v.__s == v.state ? v.__s = s({}, v.__s) : v.__s, P.getDerivedStateFromProps(_, v.__s)), p) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && f.push(v);else {
        if (null == P.getDerivedStateFromProps && null == e && null != v.componentWillReceiveProps && v.componentWillReceiveProps(_, C), !e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(_, v.__s, C)) {
          for (v.props = _, v.state = v.__s, v.__d = !1, v.__v = u, u.__e = null != c ? c !== t.__e ? c : t.__e : null, u.__k = t.__k, h = 0; h < u.__k.length; h++) {
            u.__k[h] && (u.__k[h].__p = u);
          }

          break n;
        }

        null != v.componentWillUpdate && v.componentWillUpdate(_, v.__s, C);
      }

      for (d = v.props, w = v.state, v.context = C, v.props = _, v.state = v.__s, (h = n.__r) && h(u), v.__d = !1, v.__v = u, v.__P = l, h = v.render(v.props, v.state, v.context), u.__k = null != h && h.type == y && null == h.key ? h.props.children : h, null != v.getChildContext && (i = s(s({}, i), v.getChildContext())), p || null == v.getSnapshotBeforeUpdate || (g = v.getSnapshotBeforeUpdate(d, w)), b(l, u, t, i, r, o, f, c, a), v.base = u.__e; h = v.__h.pop();) {
        v.__s && (v.state = v.__s), h.call(v);
      }

      p || null == d || null == v.componentDidUpdate || v.componentDidUpdate(d, w, g), k && (v.__E = v.__p = null);
    } else u.__e = z(t.__e, u, t, i, r, o, f, a);

    (h = n.diffed) && h(u);
  } catch (l) {
    n.__e(l, u, t);
  }

  return u.__e;
}

function j(l, u) {
  for (var t; t = l.pop();) {
    try {
      t.componentDidMount();
    } catch (l) {
      n.__e(l, t.__v);
    }
  }

  n.__c && n.__c(u);
}

function z(n, l, u, t, i, r, o, c) {
  var s,
      a,
      h,
      v,
      p = u.props,
      y = l.props;
  if (i = "svg" === l.type || i, null == n && null != r) for (s = 0; s < r.length; s++) {
    if (null != (a = r[s]) && (null === l.type ? 3 === a.nodeType : a.localName === l.type)) {
      n = a, r[s] = null;
      break;
    }
  }

  if (null == n) {
    if (null === l.type) return document.createTextNode(y);
    n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), r = null;
  }

  return null === l.type ? p !== y && (null != r && (r[r.indexOf(n)] = null), n.data = y) : l !== u && (null != r && (r = e$1.slice.call(n.childNodes)), h = (p = u.props || f).dangerouslySetInnerHTML, v = y.dangerouslySetInnerHTML, c || (v || h) && (v && h && v.__html == h.__html || (n.innerHTML = v && v.__html || "")), C(n, y, p, i, c), l.__k = l.props.children, v || b(n, l, u, t, "foreignObject" !== l.type && i, r, o, f, c), c || ("value" in y && void 0 !== y.value && y.value !== n.value && (n.value = null == y.value ? "" : y.value), "checked" in y && void 0 !== y.checked && y.checked !== n.checked && (n.checked = y.checked))), n;
}

function A(l, u, t) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, t);
  }
}

function D(l, u, t) {
  var i, r, o;

  if (n.unmount && n.unmount(l), (i = l.ref) && A(i, null, u), t || "function" == typeof l.type || (t = null != (r = l.__e)), l.__e = l.l = null, null != (i = l.__c)) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    i.base = i.__P = null;
  }

  if (i = l.__k) for (o = 0; o < i.length; o++) {
    i[o] && D(i[o], u, t);
  }
  null != r && a(r);
}

function H(n, l, u) {
  return this.constructor(n, u);
}

function I(l, u, t) {
  var i, o, c;
  n.__p && n.__p(l, u), o = (i = t === r$1) ? null : t && t.__k || u.__k, l = h(y, null, [l]), c = [], $(u, i ? u.__k = l : (t || u).__k = l, o || f, f, void 0 !== u.ownerSVGElement, t && !i ? [t] : o ? null : e$1.slice.call(u.childNodes), c, !1, t || f, i), j(c, l);
}

n = {}, m.prototype.setState = function (n, l) {
  var u = this.__s !== this.state && this.__s || (this.__s = s({}, this.state));
  ("function" != typeof n || (n = n(u, this.props))) && s(u, n), null != n && this.__v && (l && this.__h.push(l), k(this));
}, m.prototype.forceUpdate = function (n) {
  var l,
      u,
      t,
      i = this.__v,
      r = this.__v.__e,
      o = this.__P;
  o && (l = !1 !== n, u = [], t = $(o, i, s({}, i), this.__n, void 0 !== o.ownerSVGElement, null, u, l, null == r ? w(i) : r), j(u, i), t != r && g(i)), n && n();
}, m.prototype.render = y, u = [], t$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, i = n.debounceRendering, n.__e = function (n, l, u) {
  for (var t; l = l.__p;) {
    if ((t = l.__c) && !t.__p) try {
      if (t.constructor && null != t.constructor.getDerivedStateFromError) t.setState(t.constructor.getDerivedStateFromError(n));else {
        if (null == t.componentDidCatch) continue;
        t.componentDidCatch(n);
      }
      return k(t.__E = t);
    } catch (l) {
      n = l;
    }
  }

  throw n;
}, r$1 = f, o = 0;

var PROPS = Symbol(),
    IGNORE_ATTR = Symbol(),
    context = {},
    pwc = function pwc(tag, PreactComponent, propTypes) {
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
        return h(PreactComponent, props);
      };

      return _this;
    }

    return _class;
  }(PWC), _class.propTypes = PreactComponent.propTypes || propTypes, _temp));
  return function (props) {
    return h(tag, props, props.children);
  };
},
    x$1 = function x(t, c, p) {
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
          I(_this2.render(c({
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

    _this2.attachShadow({
      mode: 'open'
    });

    _this2._root = _this2.shadowRoot || _assertThisInitialized(_this2); //in case i decide to later include the option to not use shadowDom

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
    /* inspired by atomico  */

  }, {
    key: "disconnectedCallback",

    /*  web components may call disconnected callback when the node is just being moved.
        for example, if a user manually relocates the web component in the dom via something like node.insertBefore ...
        so checking if the web component is still connected is necessary  */
    value: function disconnectedCallback() {
      !this.isConnected && I(function () {
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
          r(prototype, prop, {
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
exports.x = x$1;
//# sourceMappingURL=index.js.map
