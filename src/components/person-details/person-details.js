
import React,{Component} from 'react'
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import './person-details.css'

export default class PersonDetails extends Component{
    swapiService=new SwapiService()
   state={
       person:null
      
    };

    componentDidMount(){
        console.log("componentDidMount",this.props.personId)
        this.updatePerson();
    }

    componentDidUpdate(prevProps){
        if(this.props.personId != prevProps.personId){
            this.updatePerson()
        }
    }

    updatePerson(){
    const{personId}=this.props;
    if(!personId){
            return;
      }
     this.swapiService.getPeople(personId).then((person)=>{
        this.setState({person})
        });
    }

    render(){
        const{person}=this.state;
    if(!person){
        return <Spinner/>
    }
        const{id,name,gender,birthYear,eyeColor}=this.state.person 
                return(
            <div className='person-details card'>
            <img className='person-image' 
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt='characters'
            />
            <div className='card-body'>
        <h4>{name}{` (id :: ${this.props.personId})`}</h4>
                <ul className='list-group group-flush'>
                <li className='list-group-item'>
                    <span className='term'>Gender</span>
                    <span>{gender}</span>
                </li>
                <li className='list-group-item'>
                    <span className='term'>Birth Year</span>
                    <span>{birthYear}</span>
                </li>
                <li className='list-group-item'>
                    <span className='term'>Eye Color</span>
                    <span>{eyeColor}</span>
                </li>
                </ul>
            </div>
        </div>)
    }
}