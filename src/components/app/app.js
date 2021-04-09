import React, { Component } from 'react'
import RandomPlanet from '../random-planet'
import ItemList from '../item-list'
import Header from '../header'
import Button from '../button'
import PersonDetails from '../person-details'
import './app.css'
export default class App extends Component{
    state={
        status:false,
        showRandomPlanet:true,
        selectedPerson:3
    }

    onPersonSelected=(id)=>{
        this.setState({
            selectedPerson:id
        })
    }
    click=()=>{
       this.setState({status:!this.state.status})
    }
    render(){   
        const{status}=this.state
        const res = status? null:<RandomPlanet/>
        return(
            <div className='main'>
                <Header/>
                {res}
                <Button clickButton={this.click} className='btn'/>
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
        );
    }
    
};
