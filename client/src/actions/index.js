import axios from "axios"

export function getPokemons(){
    return async function(dispatch){
        let info = await axios.get("http://localhost:3001/pokemons",{

        })
        console.log(info)
        return dispatch({
            
            type: "GET_POKEMONS",
            payload: info.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        let info = await axios.get("http://localhost:3001/types", {

        })
        return dispatch({
            type: "GET_TYPES",
            payload: info.data
    })
  }
}

export function filterPokemonsByTypes(payload){
   console.log(payload)
    return {
        type: "FILTER_BY_TYPE",
        payload
       
    }
}
export function orderedPokemons(payload){
    return {
        type: "ORDERED_POKEMONS",
        payload
    }
}
export function orderedPokemonsStrenght(payload){
    return{
        type:"STRENGHT_POKEMONS",
        payload
    }
}
export function pokemonsByName (payload){
    return async function(dispatch){
        let info = await axios.get(`http://localhost:3001/pokemons?name=${payload}`,{

        })
        return dispatch({
            type: "GET_POKEMONS_BY_NAME",
            payload: info.data
        })
    }
}
export function postPokemon(pokemon){
    return async function(dispatch){
        let info = await axios.post("http://localhost:3001/pokemon",pokemon);
        return info
        
    }
}
export function pokemonDetails(id){
    return async function(dispatch){
        let info = await axios.get("http://localhost:3001/pokemons/" + id)
        return dispatch({
            type: "POKEMON_DETAILS",
            payload: info.data

        })
    }
}
    
export function filterDB(payload){
    return {
        type: "FILTER_DB",
        payload
    }
}