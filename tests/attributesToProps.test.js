import {pwc} from "../src";
import {h, Component, Fragment} from 'preact';
import {randomName, mount, till} from "./_testUtils";

import {obi} from "@iosio/obi";


var expectedCalls, tests, shouldUpdate;

const createPwc = ({propTypes = {}, renderFunc}) => {

    let tag = randomName();

    pwc(tag, class extends Component {

        static propTypes = propTypes;

        state = {test: 'abc'};

        shouldComponentUpdate(nextProps, nextState, nextContext) {
            return shouldUpdate;
        }

        render(props) {

            expectedCalls.render();

            return renderFunc ? renderFunc(props) : null;
        }

        componentDidMount() {
            expectedCalls.didMount();
        }


        componentDidUpdate() {
            expectedCalls.didUpdate();
        }

        componentWillUnmount() {
            expectedCalls.willUnmount();
        }

    });

    return tag;
};


describe('attributes are properly converted from the web component and passed as props to the preact component', () => {


    beforeEach(function () {

        shouldUpdate = undefined;


        expectedCalls = jasmine.createSpyObj('expectedCalls',
            ['render', 'didMount', 'didUpdate', 'willUnmount', 'renderedAttributesToProps']
        );

        tests = ({render, didMount, didUpdate, willUnmount}) => {
            (render || render === 0) && expect(expectedCalls.render.calls.count()).toEqual(render);
            (didMount || didMount === 0) && expect(expectedCalls.didMount.calls.count()).toEqual(didMount);
            (didUpdate || didUpdate === 0) && expect(expectedCalls.didUpdate.calls.count()).toEqual(didUpdate);
            (willUnmount || willUnmount === 0) && expect(expectedCalls.willUnmount.calls.count()).toEqual(willUnmount);
        };

    });


    it('passes attributes as props to the render method and converts the types into what they are declared as in the propTypes static property', async (done) => {


        const propTypes = {
            string: String,
            number: Number,
            boolean: Boolean,
            object: Object,
            array: Array,
            date: Date
        };

        const attributes = {
            string: 'hello',
            number: 123,
            boolean: true,
            object: {heyo: 'sup sup'},
            array: ['a', 'b', 'c']
        };


        let expectedShadowDom = JSON.stringify(attributes);


        let results = await mount({

            attributes,

            tag: createPwc({
                propTypes,
                renderFunc:({host, ...props})=>{
                    expectedCalls.renderedAttributesToProps(props);
                    return <Fragment>{JSON.stringify(props)}</Fragment>
                }
            })
        });


        let {node, tag, lightDomSnapshot, shadowSnapshot} = results;

        let expectedTestAttrs = 'string="hello" number="123" boolean="true" object="{&quot;heyo&quot;:&quot;sup sup&quot;}" array="[&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]"';


        expect(lightDomSnapshot()).toBe(`<${tag} ${expectedTestAttrs}></${tag}>`);

        expect(expectedCalls.renderedAttributesToProps).toHaveBeenCalledWith(attributes);

        expect(shadowSnapshot()).toBe(expectedShadowDom);


        tests({
            render: 1,
            didMount: 1,
            didUpdate: 0,
            willUnmount: 0,
        });

        done();

    });



    it('ignores externally set attributes that are not declared as propTypes / observedAttributes', async (done) => {


        const propTypes = {};

        const attributes = {
            string: 'hello',
            number: 123,
            boolean: true,
            object: {heyo: 'sup sup'},
            array: ['a', 'b', 'c']
        };

        let results = await mount({

            attributes,

            tag: createPwc({
                propTypes,
                renderFunc:({host, ...props})=>{
                    expectedCalls.renderedAttributesToProps(props);
                    return <Fragment></Fragment>
                }
            })
        });


        let {node, tag, lightDomSnapshot, shadowSnapshot} = results;


        expect(expectedCalls.renderedAttributesToProps).toHaveBeenCalledWith({});


        expect(shadowSnapshot()).toBe('');


        tests({
            render: 1,
            didMount: 1,
            didUpdate: 0,
            willUnmount: 0,
        });


        node.string = 'hello';

        await node._process;


        tests({
            render: 1,
            didMount: 1,
            didUpdate: 0,
            willUnmount: 0,
        });



        done();

    });






    it('passes attributes to props and re-renders when the value changes', async (done) => {


        const propTypes = {
            string: String,
        };

        const attributes = {
            string: 'hello',
        };


        let results = await mount({

            attributes,

            tag: createPwc({
                propTypes,
                renderFunc:({host, ...props})=>{
                    expectedCalls.renderedAttributesToProps(props);
                    return <Fragment>{JSON.stringify(props)}</Fragment>
                }
            })
        });


        let {node, tag, lightDomSnapshot, shadowSnapshot} = results;


        expect(lightDomSnapshot())
            .toBe(`<${tag} string="hello"></${tag}>`);


        expect(expectedCalls.renderedAttributesToProps).toHaveBeenCalledWith(attributes);


        expect(shadowSnapshot()).toBe(JSON.stringify(attributes));


        tests({
            render: 1,
            didMount: 1,
            didUpdate: 0,
            willUnmount: 0,
        });

        node.setAttribute('string', 'hello again');

        await node._process;

        tests({
            render: 2,
            didMount: 1,
            didUpdate: 1,
            willUnmount: 0,
        });

        expect(lightDomSnapshot())
            .toBe(`<${tag} string="hello again"></${tag}>`)

        expect(shadowSnapshot()).toBe(JSON.stringify({string: 'hello again'}));

        done();

    });



});
