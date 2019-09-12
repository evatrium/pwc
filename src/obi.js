import {isObj, isArray, isFunc, def} from "@iosio/util";
import {useCallback, useEffect, useState} from "preact/hooks";
import {h, Component, createElement} from "preact";


export const Subie = () => {
    let subs = [],
        unsub = (sub, i) => {
            let out = [];
            for (i = subs.length; i--;) subs[i] === sub ? (sub = null) : (out.push(subs[i]));
            subs = out;
        };
    return {
        unsub,
        sub: sub => (subs.push(sub), () => unsub(sub)),
        notify: data => subs.forEach(s => s && s(data))
    }
};

let newObj = () => Object.create(null);

export const useForceUpdate = () => {
    const [, set] = useState(newObj());
    return useCallback(() => set(newObj()), [set]);
};

export const useObi = (...obi) => {
    let fu = useForceUpdate();
    useEffect(() => {
        let unsubs = [];
        obi.forEach(o => unsubs.push(o.$onChange(fu)));
        return () => unsubs.forEach(f => f());
    }, []);
    return obi;
};

export const connectObi = (...obi) => Child => {
    function Connected() {
        let unsubs = [];
        obi.forEach(d => unsubs.push(d.$onChange(() => this.setState(newObj()))));
        this.componentWillUnmount = () => unsubs.forEach(f => f());
        this.render = () => h(Child, {...this.props}, this.props.children);
    }

    return (Connected.prototype = new Component()).constructor = Connected;
};

export const preactIntegrations = (obj) => [
    ['$use', (...args) => (useObi(obj, ...args))],
    ['$connect', (...args) => connectObi(obj, ...args)]
];

export const createObi = integrations => suspect => {
    const {sub, notify} = Subie();
    let makeObi = (obj) => {
        if (obj.$obi) return obj;
        integrations && integrations(obj).forEach(config =>
            def(obj, config[0], {enumerable: false, value: config[1]})
        );
        def(obj, '$obi', {enumerable: false, value: true});
        def(obj, '$batching', {enumerable: false, value: {active: false}});
        def(obj, '$onChange', {enumerable: false, value: update => sub(update)});
        def(obj, '$getState', {
            enumerable: false,
            value: () => Object.keys(obj).reduce((acc, curr) =>
                !isFunc(obj[curr]) ? (acc[curr] = (isObj(obj[curr]) && obj[curr].$obi)
                    ? obj[curr].$getState() : obj[curr], acc) : acc, {})
        });
        def(obj, '$merge', {
            enumerable: false,
            value: (update, ignoreUpdate) => {
                obj.$batching.active = true;
                isFunc(update) ? update(suspect) : Object.assign(suspect, update);
                obj.$batching.active = false;
                !ignoreUpdate && notify(suspect);
            }
        });
        for (let key in obj) {
            let internal = obj[key];
            if (isFunc(internal) || key.startsWith('$')) continue;
            if (isObj(internal)) internal = makeObi(obj[key]);
            def(obj, key, {
                enumerable: true,
                get: () => internal,
                set(value) {
                    if (value === internal) return;
                    internal = value;
                    if (!suspect.$batching.active) notify(suspect);
                },
            });
        }
        return obj
    };
    return makeObi(suspect);
};

export const obi = createObi(preactIntegrations);

