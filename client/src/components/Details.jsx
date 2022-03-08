import React from "react";
import { Link } from "react-router-dom";
import { pokemonDetails } from "../actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Details.css"

export default function Details(props){
const dispatch = useDispatch();
const detailsss = useSelector((state) => state.detailsOfPokemons)
useEffect(()=>{
    dispatch(pokemonDetails(props.match.params.id));
})
return (
    <div className="image">
        {
            detailsss.length > 0 ? 
            <div className="cardd">
                <h1 className="cuadro1">{detailsss[0].name}</h1>
                <img className="pokemon" src={detailsss[0].image}/>
                <h3 className="cuadro">ID: {detailsss[0].id}</h3>
                <h4 className="cuadro">HP: {detailsss[0].hp}</h4>
                <h4 className="cuadro" >Strenght:  {detailsss[0].strenght}</h4>
                <h3 className="cuadro" >Defense:  {detailsss[0].defense} </h3>
                <h3 className="cuadro">Speed:  {detailsss[0].speed}</h3>
                <h3 className="cuadro" >Height:  {detailsss[0].height}</h3>
                <h3 className="cuadro">Weight:  {detailsss[0].weight}</h3>
                <h2 className="cuadro">Types:  {detailsss[0].types.map(el =>{if( el.name){ return " "+ el.name + " /"} else {return " "+ el + " /"}})}</h2>
            </div>: <p> Pokemon not found</p>
        }
        <Link to ="/home">
            <button className="buttom">Home</button>
        </Link>
    </div>
)
}