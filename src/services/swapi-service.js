export default class SwapiService{

    _appiBase='https://swapi.dev/api';

    async getResource(url){
      const res = await fetch(`${this._appiBase}${url}`);
      if(!res.ok){
        throw new Error(`couls not fetch ${url}` + `, received ${res.status}`)
     
      }
      return await res.json();
    }

    async getAllPeople(){
      const res = await this.getResource(`/people/`) 
      return res.results.map(this._transformPerson)
    }
    
    async getPeople(id){
      const people = await this.getResource(`/people/${id}/`)
      return this._transformPerson(people)
    }

    async getAllPlanets(){
      const res =await this.getResource(`/planets/`) 
      return res.results.map(this._transformPlanet)
    }
    
    async getPlanet(id){
      const planet= await this.getResource(`/planets/${id}/`)
      return this._transformPlanet(planet)
    }

    async getAllStarships(){
      const res =await this.getResource(`/starships/`) 
      return res.results.map(this._transformStarship)
    }

    async getStarship(id){
      const starships = await this.getResource(`/starships/${id}/`)
      return this._transformStarship(starships)
    }

    _extractId(item){
      const idRegExp=/\/([0-9]*)\/$/;
      return item.url.match(idRegExp)[1];
    }

    _transformPlanet=(planet)=>{
        return{
        id:this._extractId(planet),
        name:planet.name,
        population:planet.population,
        rotationPeriod:planet.rotation_period,
        diameter:planet.diameter
        }
    }
    _transformStarship=(starship)=>{
      return{
      id:this._extractId(starship),
      name:starship.name,
      model:starship.model,
      manufacturer:starship.manufacturer,
      consInCredits:starship.consInCredits,
      length:starship.length,
      crew:starship.crew,
      passenger:starship.passenger,
      cargoCapacity:starship.cargoCapacity,
      }
    }
    _transformPerson=(people)=>{
      return{
      id:this._extractId(people),
      name:people.name,
      gender:people.gender,
      birthYear:people.birthYear,
      eyeColor:people.eyeColor
      }
    }
  
  }


    
   
    