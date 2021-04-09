import React,{Component} from 'react'
import './random-planet.css'
import Spinner from '../spinner'
import SwapiService from '../../services/swapi-service'
import ErrorIndicator from '../error-indicator'


export default class RandomPlanet extends Component{
swapiservice = new SwapiService();
state={
    planet:{},
    loading:true,
    error:false
};

componentDidMount(){
   this.interval=setInterval(this.updatePlanet,2000)
}
componentWillUnmount(){
    clearInterval(this.interval)
    console.log('cancel updates')
}
onPlanetLoaded=(planet)=>{
    this.setState({planet:planet,
    loading:false})
}
onError=()=>{
    this.setState({error:true,
        
                  loading:false})
}
updatePlanet=()=>{
    const id=Math.floor(Math.random()*20)+2
    this.swapiservice.getPlanet(id).then(this.onPlanetLoaded).catch(this.onError)
}

render(){
    const {planet,loading,error}=this.state
    const errorMesage=error?<ErrorIndicator/>:null;
    const hasData=!(loading || error)
    const spinner = loading? <Spinner/>:null;
    const content = hasData? <PlanetView planet={planet}/>:null;
     return(

    <div className='random-planet jumbotron rounded'>
        {errorMesage}
        {spinner}
        {content}
    </div>)

    }
 }

const PlanetView=({planet})=>{
    const{ name,population,rotationPeriod,diameter,id }=planet;
    return(
        <React.Fragment>
        <img className='planet-image' 
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
        <div>
            <h4>{name}</h4>
            <ul className='list-group group-flush'>
            <li className='list-group-item'>
                <span className='term'>Population : </span>
                <span>{population}</span>
            </li>
            <li className='list-group-item'>
                <span className='term'>Rotation Period : </span>
                <span>{rotationPeriod}</span>
            </li>
            <li className='list-group-item'>
                <span className='term'>Diameter : </span>
                <span>{diameter}</span>
            </li>
            </ul>
        </div>
        </React.Fragment>
    )
}
