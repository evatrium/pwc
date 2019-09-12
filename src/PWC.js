import {
    formatType,
    updateAttribute,
    propToAttr,
    attrToProp,
    webComponentVisibility,
    TEST_ENV
} from "../src/utils";

import {def, extend} from "@iosio/util";

import {h, render} from "preact";

let PROPS = Symbol(),
    IGNORE_ATTR = Symbol(),
    context = {},
    pwc = (tag, PreactComponent, propTypes) => {
        webComponentVisibility(tag);
        customElements.define(tag, class extends PWC {
                static propTypes = PreactComponent.propTypes || propTypes;
                render = props => h(PreactComponent, props);
            }
        );
        return (props) => h(tag, props, props.children);
    },
    x = (t, c, p) => pwc('x-' + t, c, p);

class PWC extends HTMLElement {
    //easier theming
    context = context;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._root = (this.shadowRoot || this);//in case i decide to later include the option to not use shadowDom
        this[PROPS] = {};
        this._mounted = new Promise(mount => (this._mount = mount));
        this.update();
        let {_initAttrs} = this.constructor;
        let length = _initAttrs.length;
        while (length--) _initAttrs[length](this);
    }
    /*
     adding visibility inherit on next tick after (inspired by stencil.js)
     will prevent flash of un-styled content (common complaint with web components).
     Removing this functionality during testing makes life easier
    */
    update = () => {
        if (!this._process) {
            this._process = this._mounted.then(_ => {
                render(this.render(extend({host: this}, this[PROPS])), this._root);
                !this._hasMounted && !TEST_ENV && requestAnimationFrame(() => this.classList.add('___'));
                this._hasMounted = true;
                this._process = false;
            });
        }
        return this._process;
    };

    connectedCallback() {
        !this._hasMounted && this._mount();
    }

    emit = (name, detail, from) =>
        (from || this).dispatchEvent(
            new CustomEvent(name, {detail, bubbles: true, composed: true})
        );

    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr === this[IGNORE_ATTR] || oldValue === newValue) return;
        this[attrToProp(attr)] = newValue;
    }

    /* inspired by atomico  */
    static get observedAttributes() {
        let {propTypes, prototype} = this;
        this._initAttrs = [];
        if (!propTypes) return [];
        return Object.keys(propTypes).map(prop => {
            let attr = propToAttr(prop),
                schema = propTypes[prop].name ? {type: propTypes[prop]} : propTypes[prop];
            if (!(prop in prototype)) {
                def(prototype, prop, {
                    get() {
                        return this[PROPS][prop]
                    },
                    set(nextValue) {
                        let {value, error} = formatType(nextValue, schema.type);
                        if (error && value != null) throw `[${prop}] must be type [${schema.type.name}]`;
                        if (value === this[PROPS][prop]) return;
                        if (schema.reflect) {
                            this._mounted.then(() => {
                                this[IGNORE_ATTR] = attr;
                                updateAttribute(this, attr, schema.type === Boolean && !value ? null : value);
                                this[IGNORE_ATTR] = false;
                            });
                        }
                        this[PROPS][prop] = value;
                        this.update();
                    }
                });
            }
            schema.value && this._initAttrs.push(self => (self[prop] = schema.value));
            return attr;
        });
    };

    /*  web components may call disconnected callback when the node is just being moved.
        for example, if a user manually relocates the web component in the dom via something like node.insertBefore ...
        so checking if the web component is still connected is necessary  */
    disconnectedCallback() {
        !this.isConnected && render(() => null, this._root);
    }
}

export {x, pwc, context}



