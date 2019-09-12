import {pwc} from "../src";
import {h, Component} from 'preact';
import {randomName, mount, till} from "./_testUtils";

import {obi} from "@iosio/obi";


var lifeCycles, tests, tag, node, shouldUpdate, observable;

const createPwc = () => {

    let tag = randomName();

    pwc(tag, class extends Component {

        static propTypes = {
            testText: {type: String, reflect: true, value: ''}
        };

        state = {test: 'abc'};

        shouldComponentUpdate(nextProps, nextState, nextContext) {
            return shouldUpdate;
        }

        render({testText}) {

            lifeCycles.render();

            return (<h1>{testText}</h1>)
        }

        componentDidMount() {
            lifeCycles.didMount();
        }


        componentDidUpdate() {
            lifeCycles.didUpdate();
        }

        componentWillUnmount() {
            lifeCycles.willUnmount();
        }

    });

    return tag;
};


describe('preact Component lifeCycles behave as expected', () => {


    beforeEach(function () {

        shouldUpdate = undefined;


        tag = createPwc();


        lifeCycles = jasmine.createSpyObj('lifeCycles',
            ['render', 'didMount', 'didUpdate', 'willUnmount']
        );

        tests = ({render, didMount, didUpdate, willUnmount}) => {
            (render || render === 0) && expect(lifeCycles.render.calls.count()).toEqual(render);
            (didMount || didMount === 0) && expect(lifeCycles.didMount.calls.count()).toEqual(didMount);
            (didUpdate || didUpdate === 0) && expect(lifeCycles.didUpdate.calls.count()).toEqual(didUpdate);
            (willUnmount || willUnmount === 0) && expect(lifeCycles.willUnmount.calls.count()).toEqual(willUnmount);
        };

    });


    it('the initial render should call the correct lifecycle methods', async (done) => {

        let {node} = await mount({tag});

        tests({
            render: 1,
            didMount: 1,
            didUpdate: 0,
            willUnmount: 0,
        });

        node.remove();

        done();

    });


    it('setting an attribute (one which is observed) should trigger the correct lifecycle methods ', async (done) => {


        let {node} = await mount({tag});


        node.setAttribute('test-text', 'test1');

        await node._process;

        tests({
            render: 2,
            didMount: 1,
            didUpdate: 1,
            willUnmount: 0,
        });

        node.remove();

        done();

    });


    it('setting an attribute again with the same value should not trigger a re-render ', async (done) => {

        let {node} = await mount({tag}); //1

        node.setAttribute('test-text', 'test1'); // 2

        await node._process;

        node.setAttribute('test-text', 'test1'); // 3

        await node._process;

        tests({
            render: 2,
            didMount: 1,
            didUpdate: 1,
            willUnmount: 0,
        });

        node.remove();

        done();

    });

    it('setting an attribute (one which is observed) again with a new value should trigger the correct lifecycle methods ', async (done) => {


        let {node} = await mount({tag});

        node.setAttribute('test-text', 'test1');

        await node._process;

        tests({
            render: 2,
            didMount: 1,
            didUpdate: 1,
            willUnmount: 0,
        });

        /*
          setting an attribute with a new value SHOULD trigger a rerender
        */
        node.setAttribute('test-text', 'test2');


        await node._process;

        tests({
            render: 3,
            didMount: 1,
            didUpdate: 2,
            willUnmount: 0,
        });

        node.remove();

        done();
    });


    it('returning a falsy value (other than undefined) from willRender() should prevent a re-render ', async (done) => {

        let {node} = await mount({tag});

        /*
             returning true from willRender should prevent re-rendering
             (hence - willRender will be called in order to return the value)
        */

        shouldUpdate = false;

        node.setAttribute('test-text', 'test1');

        await node._process;

        tests({
            render: 1,
            didMount: 1,
            didUpdate: 0,
            willUnmount: 0,
        });

        node.remove();


        done();

    });


    it('removing the custom element from the dom should call componentWillUnmount ', async (done) => {

        let {node} = await mount({tag});


        tests({
            render: 1,
            didMount: 1,
            didUpdate: 0,
            willUnmount: 0,
        });


        node.remove();



        tests({
            render: 1,
            didMount: 1,
            didUpdate: 0,
            willUnmount: 1,
        });

        done();

    });

});