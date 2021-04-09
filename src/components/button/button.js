import React,{Component} from 'react'
import './button.css'
export default class Button extends Component{
       render(){
        return(
            <button className ='btn' onClick={this.props.clickButton }>Click</button>)
    } 
}