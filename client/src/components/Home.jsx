import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterPokemonsByTypes,orderedPokemons,orderedPokemonsStrenght,filterDB } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css"

export default function Home() {
    const dispatch = useDispatch();
    const pokemonsss = useSelector ((state) => state.pokemons);
    const [page, setPage] = useState(1);
    const [pokemonPage, setPokemonPage] = useState(11);
    const [orderPok, setOrderPok] = useState("")
    const [orderStrenght, setOrderStrenght] = useState("")
    const [orderDB, setOrderDB] = useState("")  
    const lastPokemon = page * pokemonPage;
    const pokemon1 = lastPokemon - pokemonPage;
    const pokemonsInPage = pokemonsss.slice(pokemon1,lastPokemon);
    const pages = (pagex) =>{
        setPage(pagex)
    }
    useEffect(()=> {
        dispatch(getPokemons())
    },[dispatch])

    function resetPokemons(event){
        event.preventDefault();
        dispatch(getPokemons())
        setPage(1)
    }
    function filterTypes(e){
        dispatch(filterPokemonsByTypes(e.target.value))
        setPage(1)
        
    }
    function orderedpokemonsbyname(e){
        e.preventDefault();
        dispatch(orderedPokemons(e.target.value));
        setPage(1);
        setOrderPok("Now you are ordering by" + e.target.value)
        e.target.reset()
    }
    function orderedpokemonsbystrenght(e){
        e.preventDefault();
        dispatch(orderedPokemonsStrenght(e.target.value));
        setPage(1);
        setOrderStrenght("Now you are ordering by" + e.target.value)
        e.target.reset()
    }
    function filterDataBase(e){
        e.preventDefault();
        dispatch(filterDB(e.target.value))
       setPage(1)
    }
    function nextPage(){
        
            setPage(page + 1)
    }
    function backPage(){
    setPage(page - 1)
    }
    let lastpage = pokemonsss.length/11
    return( 
        <div className="fondo">
            <Link to="/pokemon" > <button className="resett">Create Pokemon</button></Link>
            <h1>Welcome to our HomePage</h1>
            <button className="reset" onClick={e => {resetPokemons(e)}}>
                Reset Pokemons
            </button>
            <div>
                <select className="select" onChange={ e => orderedpokemonsbystrenght(e)}>
                  
                    <option value ="stronger">Stronger</option>
                    <option value="non">Weaker</option>
                </select>
                <select className="select" onChange={e => orderedpokemonsbyname(e)}>
                    
                    <option value="asc">Ascendant</option>
                    <option value="des">Degressive</option>
                </select>
                <select className="select" onChange={e => filterTypes(e)}>
              
                    <option value="All">All</option>
                    <option value="normal">Normal</option>
                    <option value="flying">Flying</option>
                    <option value="poison">Poison</option>
                    <option value="bug">Bug</option>
                    <option value="ghost">Ghost</option>
                    <option value="steel">Steel</option>
                    <option value="water">Water</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="ice">Ice</option>
                    <option value="fairy">Fairy</option>
                    <option value="unknown">Unknown</option>
                    <option value="shadow">Shadow</option>
                    <option value="ground">Ground</option>
                    <option value="rock">Rock</option>
                    <option value="grass">Grass</option>
                    <option value="dragon">Dragon</option>
                    <option value="fighting">Fighting</option>
                    <option value="fire">Fire</option>
                    <option value="dark">Dark</option>
                </select>
                <select className="select" onChange={e => filterDataBase(e)}>
                    <option  value="All">All</option>
                    <option value="createdDB">DB</option>
                    <option value="api">Api</option>
                </select>
               <Paginado paginado={pages} pokemons={pokemonsss.length} pokemonsinpage={pokemonPage}/>
               { page > 1?
               <button className ="botonsito" onClick={(e)=> backPage(e)}> Back</button>: null
               } 
              {      page <= lastpage?
                  <button className ="botonsito" onClick={(e)=> nextPage(e)}> Next</button>:null
              }
               <SearchBar />
                {
                    pokemonsInPage && pokemonsInPage.map(el => {
                        return( 
                            <div className="cards">
                                <Link to ={"/home/" + el.id}>
                        <Card name={el.name} image={el.image} types={el.types.map(el =>{if( el.name){ return " "+ el.name + "/"} else {return " "+ el + "/"}})} key={el.id}/>
                        </Link>
                        </div>
                        );
                    })
                }
            </div>
        </div>
    )
}