import {pwc} from "../src";
import {h, Component} from 'preact';
import {randomName, mount} from "./_testUtils";

import {obi} from "@iosio/obi";

describe('class and functional components render the correct nodes', () => {

    it('creates a custom element from a preact class component', async (done) => {

        let tag = randomName();

        pwc(tag, class extends Component {
            render() {
                return (<div>hello</div>)
            }
        });

        let results = await mount({tag});

        let {node, lightDomSnapshot, shadowSnapshot} = results;

        expect(lightDomSnapshot()).toBe(`<${tag}></${tag}>`);

        expect(shadowSnapshot()).toBe('<div>hello</div>');

        done();

    });

    it('creates a custom element using a preact functional component', async (done) => {

        let tag = randomName();

        pwc(tag, () => (<div>hello</div>));

        let results = await mount({tag});

        let {node, lightDomSnapshot, shadowSnapshot} = results;

        expect(lightDomSnapshot()).toBe(`<${tag}></${tag}>`);

        expect(shadowSnapshot()).toBe('<div>hello</div>');

        done();

    });

    it('creates a custom pwc using a functional component and with propTypes passed to the third parameter', async (done) => {

        let tag = randomName();

        pwc(tag, ({myProp}) => (<div>hello {myProp}</div>), {myProp: String});

        let results = await mount({tag, attributes: {['my-prop']: 'hola'}});

        let {node, lightDomSnapshot, shadowSnapshot} = results;

        expect(lightDomSnapshot()).toBe(`<${tag} my-prop="hola"></${tag}>`);

        expect(shadowSnapshot()).toBe('<div>hello hola</div>');

        done();
    });

    it('re-renders correct content when state is updated', async (done) => {

        let tag = randomName();

        pwc(tag, class extends Component {

            state = {count: 0};

            inc = () => this.setState({count: this.state.count + 1});

            render(props, {count}) {
                return (
                    <div>

                        <span id="count">{count}</span>

                        <button id="inc" onClick={this.inc}>inc</button>

                    </div>
                )
            }
        });

        let results = await mount({tag});

        let {node, select, click} = results;

        let counter = select('#count');

        expect(counter.innerHTML).toBe('0');

        click('#inc');

        await node._process;

        expect(counter.innerHTML).toBe('1');

        click('#inc');

        await node._process;

        expect(counter.innerHTML).toBe('2');

        done();

    });

});
