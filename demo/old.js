import {x, PWC, globalStyles} from "../src";

import {h, render, Fragment, Component} from "preact";


import {todos} from "../demo/todos";
import {extend} from "@iosio/util";

import {obi} from "@iosio/obi/preact/index.esm.js";


globalStyles(// language=CSS
    `    html {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
        }

        .asdf {
            color: pink;
        }

        .derp {
            background: purple;
        }

        *, *::before,
        *::after {
            box-sizing: border-box;
        }
    `
);


const Test = x('test', class extends PWC {

    static propTypes = {name: String};

    constructor() {
        super();
        // console.log('test constructed')
    }

    lifeCycle() {
        // let interval = setInterval(() => {
        //
        // })
        // console.log('test mounted');
        return () => {
            // console.log('test unmounted')
        }
    }

    render({Host, name}) {
        return (
            <div>
                <h1>name: {name}</h1>
                <slot/>
            </div>
        )
    }
});


const TestListItem = x('list-item', class extends Component {
    componentDidMount() {
        console.log(this.constructor.host)
    }

    render({text, host}) {
        // console.log(host);
        return (
            <Fragment>
                <b>heyoo: {text}</b>
            </Fragment>
        )
    }
}, {text: String});

// const TestListItem = x('list-item', (props)=>{
//     return <ListItemComponent {...props}/>
// }, {text: String});

// const TestListItem = x('list-item', ({text})=>(
//     <Fragment>
//         <b>heyoo: {text}</b>
//     </Fragment>
// ), {text: String});

const test = obi({
    count: 0,
});


const counter = {
    count: 0,
    interval: null,
    start() {
        counter.stop();
        counter.interval = setInterval(() => {
            test.count = test.count + 1
        }, 1000);
    },
    stop() {
        clearInterval(counter.interval);
    }
};

const $counter = obi(counter);

const Counter = x('counter', class extends PWC {
    static propTypes = {color: String};

    constructor() {
        super();
        // console.log('counter constructed')
    }

    observe = test;

    state = {mounted: false}

    willRender(...args) {
        // console.log(...args)
    }

    //
    lifeCycle() {
        // let interval = setInterval(() => {
        //
        // })
        // console.log('mounted');
        // this.setState({mounted: true});
        return () => {
            // console.log('i unmounted')
            // this.setState({mounted: false})
        }
    }


    render({color}, {mounted}) {
        return (
            <div style={{border: '2px solid purple', width: '100%'}}>
                <style>{`
                     *, *::before,
                        *::after {
                            box-sizing: border-box;
                        }
                `}</style>
                <span style={{color: 'blue', background: mounted ? 'white' : 'red'}}>{test.count}</span>
                {/*<div style={{height: 20, width: 20, background: color || 'blue'}}>*/}

                {/*</div>*/}
            </div>
        )
    }
});


const Lister = x('lister', class extends PWC {

    constructor() {
        super();
        // console.log('lister constructed')
    }

    observe = obi(todos);

    lifeCycle() {
        // let interval = setInterval(() => {
        //
        // })
        // console.log('lister mounted');
        return () => {
            // console.log('lister unmounted')
        }
    }

    /*
        <TestListItem text={t.name} key={t.id}>
                        <button onClick={() => todos.removeTodo(t)}>X</button>
        </TestListItem>
    */

    render() {
        return (
            <ul>
                {todos.displayList.map((t) => (
                    <li key={t.id}>
                        <b>{t.name}</b>
                        <button onClick={() => todos.removeTodo(t)}>X</button>
                        <Counter/>
                    </li>
                ))}

            </ul>
        )
    }
});


const MoveElementTest = x('move', class extends PWC {


    move = () => {


        this.ul.insertBefore(this.redRef, this.blueRef);
    };

    render() {
        return (
            <div style={{width: '100%', border: '2px solid purple',}}>
                <style>{`
                     *, *::before,
                        *::after {
                            box-sizing: border-box;
                        }
                `}</style>
                <button onClick={this.move}>toggle move</button>

                <ul ref={r => this.ul = r} style={{width: '100%'}}>

                    <li ref={r => this.greenRef = r} style={{width: '100%'}}>
                        green <Counter color={'green'}/>
                    </li>

                    <li ref={r => this.blueRef = r} style={{width: '100%'}}>
                        blue <Counter color={'blue'}/>
                    </li>

                    <li ref={r => this.redRef = r} style={{width: '100%'}}>
                        red <Counter color={'red'}/>
                    </li>
                </ul>
            </div>
        )
    }
});


export const App = x('app', class extends PWC {

    static propTypes = {some: String, cool: Boolean, prop: Number, types: Object, yo: Array};

    state = {bool: true};
    // obi(extend(todos, {bool: true}));

    observe = obi(todos); // detects mutations on object values and triggers an update


    render(props, state) {

        const TextList = ({derp}) => (
            <Fragment>

                {todos.displayList.map(t => (<div onClick={derp} key={t.id}>{t.name}</div>))}

            </Fragment>

        );


        return (
            <Fragment>

                <style>
                    {// language=CSS
                        `
                            :host, *, *::before,
                            *::after {
                                box-sizing: border-box;
                            }

                            .asdf {
                                color: pink;
                            }


                            .derp {
                                background: red;
                            }
                        `}
                </style>


                {/*

                    ******************

                    changing the class on subsequent render will indicate that the fragment hack is not working correctly.
                    - if not working correctly it will change on the second re-render not the first re-render;
                    - if working, will change first re-render

                */}


                <MoveElementTest/>


                <h1 className={todos.todoName === '' ? 'derp' : null}>
                    TODOS!!!!
                </h1>


                <h1 style={state.bool ? {color: todos.todoName === '' ? 'blue' : 'red'} : 'color:green'}
                >
                    style object!!!!</h1>


                <h4> Num search results: {todos.displayList.length}</h4>


                {/*<Heyooo num={todos.displayList.length}/>*/}

                {/*<input ref={this.input} placeholder="add todo" value={todos.todoName}*/}
                {/*onInput={(e) => todos.todoName = e.target.value}/>*/}

                {/*<button onClick={() => state.bool = !state.bool}> show hid derp</button>*/}
                <button onClick={() => this.setState({bool: !state.bool})}> bool</button>

                <button onClick={$counter.start}> start counter</button>
                <button onClick={$counter.stop}> stop counter</button>


                {state.bool && <Test name={todos.todoName} onClick={() => 'asdf'
                    // console.log('shit balls')
                }/>}


                <button onClick={todos.makeABunch}>
                    make a bunch!!!
                </button>
                ... i dare you


                <br/>
                <br/>

                <input ref={this.input} placeholder="add todo" value={todos.todoName}
                       onInput={(e) => todos.todoName = e.target.value}/>

                <button onClick={todos.addTodo} style="color:blue">
                    Add todo !!! :
                </button>

                <br/>

                <input placeholder="search" value={todos.searchValue}
                       onInput={(e) => todos.setSearchValue(e.target.value)}/>

                <div style="width:100%;display:flex">

                    <div style="width:50%">

                        <x-lister></x-lister>

                    </div>


                    {/*<div style="width:50%">*/}
                    {/*<TextList derp={() => console.log('derp')}/>*/}
                    {/*</div>*/}


                </div>

                <TestListItem text={'derp'}/>


            </Fragment>
        )
    }

});
//
// export const App = x('app', class extends PWC {
//
//     state = {bool: false};
//
//     render() {
//         return (
//             <div>
//
//                 hello
//                 {this.state.bool && <div>heyoo</div>}
//
//                 <button onClick={() => this.state.bool = !this.state.bool}> click me</button>
//             </div>
//         )
//     }
// })