import React from "react";
import { useDispatch } from "react-redux";
import { pokemonsByName } from "../actions";
import { useState } from "react";
import "./Search.css"


export default function SearchBar(){
    const dispatch = useDispatch();
    const [pokemonName, setPokemonName] = useState("");
    function inputPokemon(e){
        e.preventDefault();
        setPokemonName(e.target.value);
        
    }
    function searchPokemon(e){
        e.preventDefault();
        dispatch(pokemonsByName(pokemonName))
       
    }
    return (
        <div>
            <input className="input" type="text" placeholder="Search Pokemon..." onChange={e => inputPokemon(e)}/>
            <button className="buttomm" type="submit" onClick={e => searchPokemon(e)}>Search</button>
        </div>
    )
}