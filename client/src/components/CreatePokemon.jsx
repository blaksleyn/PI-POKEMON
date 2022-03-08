import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../actions";
import "./CreatePokemon.css"
function validadora(input, tipodeerror) {
    let errors = {}

    if ((!input.name || !checkPokemonName(input.name)) && tipodeerror === "name" || input.name ===null) {
        errors.name= "Name cannot be null and must be a valid name"

    }
    else if ((!input.hp || isNaN(input.hp)) && tipodeerror === "hp" || input.hp ===null) {
        errors.hp= "Hp cannot be null and must be a number"

    }
    else if ((!input.strenght || isNaN(input.strenght)) && tipodeerror === "strenght"|| input.strenght ===null) {
        errors.strenght= "Strenght cannot be null and must be a number"
    }
    else if ((!input.speed || isNaN(input.speed)) && tipodeerror === "speed"|| input.speed ===null) {
        errors.speed= "Speed cannot be null and must be a number"
        
    }
    else if ((!input.defense || isNaN(input.defense)) && tipodeerror === "defense"|| input.defense ===null) {
        errors.defense= "Defense cannot be null and must be a number"
    }
    else if ((!input.height || isNaN(input.height)) && tipodeerror === "height"|| input.height ===null) {
        errors.height= "Height cannot be null and must be a number"
    }
    else if ((!input.weight || isNaN(input.weight)) && tipodeerror === "weight"|| input.weight===null) {
        
        errors.weight= "Weight cannot be null and must be a number"
    }

    
    return errors
}
function checkPokemonName(nombre) {
    for (let i = 0; i < nombre.length; i++) {
        if (!isNaN(nombre[i])) {
            return false
        }
    }
    return true
}



export default function CreatePokemon() {
    const BackToHome = useHistory()
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const typesss = useSelector((state) => state.types);
    const [inputCreate, setInputCreate] = useState({
        name: null,
        hp: null,
        strenght: null,
        speed: null,
        defense: null,
        types: [],
        weight: null,
        height: null
    })
    console.log(errors)
    useEffect(() => {
        dispatch(getTypes());
    }, []);
    function inputChanges(e, tipodeerror) {
        setInputCreate({
            ...inputCreate,
            [e.target.name]: e.target.value
        })
       
      
            setErrors(validadora({
                ...inputCreate,
                [e.target.name]: e.target.value
                
            }, tipodeerror))
        }
       
    
    function selectChanges(e) {
        setInputCreate({
            ...inputCreate,
            types: [...inputCreate.types, e.target.value]
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(inputCreate))
        alert("Pokemon created succesfully")
        BackToHome.push("/home")
    }
    function deleteType(e) {
        setInputCreate({
            ...inputCreate,
            types: inputCreate.types.filter(type => type !== e)
        })
    }


    return (
        <div className="image33">
            <Link to="/home"><button className="boto">Home</button></Link>
            <h1><b>Create your Pokemon</b></h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div >
                    <label><b>Name:  </b></label>
                    <input className="inputt" type="text" value={inputCreate.name} name="name" onChange={(e) => inputChanges(e, "name")} />
                    {errors.name && (<p><b>{errors.name}</b></p>)}
                </div>
                <div>
                    <label><b>HP:  </b></label>
                    <input  className="inputt" type="number" value={inputCreate.hp} name="hp" onChange={(e) => inputChanges(e, "hp")} />
                    {errors.hp && (<p><b>{errors.hp}</b></p>)}
                </div>
                <div>
                    <label><b>Strenght:  </b></label>
                    <input  className="inputt" type="number" value={inputCreate.strenght} name="strenght" onChange={(e) => inputChanges(e, "strenght")} />
                    {errors.strenght && (<p><b>{errors.strenght}</b></p>)}
                </div>
                <div>
                    <label><b>Speed:  </b></label>
                    <input  className="inputt" type="number" value={inputCreate.speed} name="speed" onChange={(e) => inputChanges(e, "speed")} />
                    {errors.speed && (<p><b>{errors.speed}</b></p>)}
                </div>
                <div>
                    <label><b>Defense:  </b></label>
                    <input  className="inputt" type="number" value={inputCreate.defense} name="defense" onChange={(e) => inputChanges(e, "defense")} />
                    {errors.defense && (<p><b>{errors.defense}</b></p>)}
                </div>
                <div>
                    <label><b>Height:  </b></label>
                    <input  className="inputt" type="number" value={inputCreate.height} name="height" onChange={(e) => inputChanges(e, "height")} />
                    {errors.height && (<p><b>{errors.height}</b></p>)}
                </div>
                <div>
                    <label><b>Weight:  </b></label>
                    <input  className="inputt" type="number" value={inputCreate.weight} name="weight" onChange={(e) => inputChanges(e, "weight")} />
                    {errors.weight && (<p><b>{errors.weight}</b></p>)}
                </div>
                <select className="selectt  " onChange={(e) => selectChanges(e)}>
                    {typesss.map(el => (
                        <option value={el.name}>
                            {el.name}
                        </option>
                    ))}
                </select>

                
                    <button className = "botones"type="submit">Create Pokemon</button> 
                    


            </form>
            {
                inputCreate.types.map(el =>
                    <div>
                        <p><b>{el}</b></p>
                        <button className = "botonchico" onClick={() => deleteType(el)}>x</button>
                    </div>
                )
            }
        </div>
    )
}