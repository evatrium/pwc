import {isArray, isObj} from "@iosio/util";

let d = document,
    TEST_ENV = process.env.NODE_ENV === 'test',
    /**
     * creates a single style sheet. returns a function to add to the same sheet
     * @returns {function} for adding styles to the same stylesheet
     */
    styleSheet = (style) => {
         style = d.createElement('style');
         d.head.appendChild(style);
        return (css) => (style.appendChild(d.createTextNode(css)), style);
    },
    globalStyles = styleSheet(),
    visibilityStyleSheet = styleSheet(),
    webComponentVisibility = (tag) => visibilityStyleSheet(`${tag} {visibility:hidden}`),
    /**
     * for parsing the incoming attributes into consumable props
     * @param value
     * @param type
     * @returns {{error: boolean, value: *}}
     */
    formatType = (value, type) => {
        type = type || String;
        try {
            if (type == Boolean) value = [true, 1, "", "1", "true"].includes(value);
            else if (typeof value == "string") {
                value = type == Number ? Number(value)
                    : type == Object || type == Array ? JSON.parse(value) : value;
            }
            if ({}.toString.call(value) == `[object ${type.name}]`)
                return {value, error: type == Number && Number.isNaN(value)};
        } catch (e) {
        }
        return {value, error: true};
    },

    /**
     * will set or remove the attribute based on the truthyness of the value.
     * if the type of value === object (accounts for array) and the node is a custom pwc, it will json stringify the value
     * @param node
     * @param attr
     * @param value
     */
    updateAttribute = (node, attr, value) => {
        (value === null || value === false)
            ? node.removeAttribute(attr)
            : node.setAttribute(attr, (isObj(value) || isArray(value)) ? JSON.stringify(value) : value);
    },
    propToAttr = (prop) => prop.replace(/([A-Z])/g, "-$1").toLowerCase(),
    attrToProp = (attr) => attr.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());


    visibilityStyleSheet(` .___ {visibility: inherit;}`, true);

export {
    TEST_ENV,
    styleSheet,
    globalStyles,
    webComponentVisibility,
    formatType,
    updateAttribute,
    propToAttr,
    attrToProp,
};
