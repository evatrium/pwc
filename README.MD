# @iosio/pwc
<img src="https://img.shields.io/circleci/project/github/iosio/pwc.svg?style=flat-square" /><img src="https://img.shields.io/npm/v/@iosio/pwc.svg?style=flat-square" /><img src="https://img.shields.io/bundlephobia/minzip/@iosio/pwc.svg?style=flat-square" />
> create web components using preact

## Installation 
```sh
npm install @iosio/pwc --save
```
### Coming soon*
**@iosio/pwc-boilerplate** - starter that will include all build tools and dependencies for creating apps and libs with pwc

then eventually

**@iosio/create-pwc** - a CLI to scaffold UI libraries and apps

### Quick example for now

```js
import {h, Fragment, Component} from 'preact';
import {useState} from 'preact/hooks'
import {pwc} from '@iosio/pwc';

//use functional components
export const ColorComponent = pwc('color-component', ({foo, host}) => {

  const [color, setColor] = useState('red')
  
  const changeColor = () =>{
     setColor(color === 'red' ? 'blue' : 'red');
  }
  
  return (
    <div>
    
      <h1 style={{color}}>hello i am {color}</h1>
      
      <button onClick={changeColor}>hello - {foo}</button>
      
      <slot/>
      
    </div>
  )
  
}, {foo: Number});



//or use class components
export const CountComponent = pwc('count-component', class extends Component{
    
    static propTypes = {name: String};
    
    state = {count:0}
    
    inc = () => this.setState(state => ({count: state.count + 1}));
    
    render({host, name}, {count}){
        return(
            <Fragment>
                <style>{
                    `
                    :host{
                       background: black;
                       padding: 10px;
                    }
                    .derp{
                        background: aliceblue;
                    }
                    `
                }</style>
            
                <button className="derp" onClick={this.inc}> click me : {count}</button>
                
                <ColorComponent foo={123}/>
                
                
                <color-component foo={456}>
                    heyoo
                </color-component>
          
            </Fragment>
        )
    }
});


/*
    Build using the boilerplate and consume components in other apps
    or create a standalone app
 */

```
### License

[MIT]

[MIT]: https://choosealicense.com/licenses/mit/
