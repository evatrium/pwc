# @iosio/pwc

> create web components using preact

## Installation 
```sh
npm install @iosio/pwc --save
```
### Coming soon*
**@iosio/create-pwc-app** - to scaffold an app

**@iosio/create-pwc-lib** - to scaffold a ui-library

#### Quick example for now

```js
import {h, Fragment, Component} from 'preact';
import {useState} from 'preact/hooks'
import {pwc} from '@iosio/pwc';


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
                
                
                <color-component foo={123}>
                    heyoo
                </color-component>
          
            </Fragment>
        )
    }
});


```
### License

[MIT]: https://choosealicense.com/licenses/mit/
