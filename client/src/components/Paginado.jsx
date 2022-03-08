import React from "react";
import "./Paginado.css"

export default function Paginado({pokemons, pokemonsinpage, paginado,}){
   const numberPaginado = [];

   for(let i = 0; i< Math.ceil(pokemons/pokemonsinpage);i++){
       numberPaginado.push(i + 1);
   };

   return(
       <nav>
           <ul className="paginado">
               {
                 numberPaginado && numberPaginado.map(numero => (
                       <div>
                            <button className="boton" onClick={() => paginado(numero)}>{numero}</button>
                       </div>
                  ))
               }
           </ul>
       </nav>
   )
}