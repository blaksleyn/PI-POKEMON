
const initialState = {
    pokemons: [],
    pokemons2: [],
    types: [],
    detailsOfPokemons: [],

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                pokemons2: action.payload,
            }
        case "GET_TYPES":
            return {
                ...state,
                types: action.payload
            }
        case "GET_POKEMONS_BY_NAME":
            return {
                ...state,
                pokemons: action.payload
            }
        case "FILTER_BY_TYPE":
            const AllPokemons = state.pokemons2
            const array = []
            const pokemonfilter = action.payload === "All" ? AllPokemons : AllPokemons.map (el => {
                if (!el.createdDB) {
                    if (el.types.includes(action.payload.toString()) === true ) {

                        array.push(el)
                    }
                return
                }
                else if (el.createdDB) {
                    el.types.map(ele => {
                        if (ele.name.includes(action.payload.toString()) === true) {
                            console.log(ele)
                            array.push(el)
                        }
                        return 
                    })   
                }
                return
            })
            const filterPokemon = array.filter(el => el !== undefined);
           
            return {
                ...state,
                pokemons: filterPokemon,

            }
        case "ORDERED_POKEMONS":
            const orderedpokemons = action.payload === "asc" ?
                state.pokemons.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) : state.pokemons.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: orderedpokemons
            }
        case "STRENGHT_POKEMONS":
            
            const strenghtOrder = action.payload === "stronger" ?
                state.pokemons.sort((a, b) => {
                    if (a.strenght > b.strenght) {
                        return -1;
                    }
                    if (b.strenght > a.strenght) {
                        return 1;
                    }
                    return 0;
                }) : state.pokemons.sort((a, b) => {
                    if (a.strenght > b.strenght) {
                        return 1;
                    }
                    if (b.strenght > a.strenght) {
                        return -1;
                    }
                    return 0;
                })
            return {
                ...state,
               pokemons: strenghtOrder
            }
        case "POST_POKEMON":
            return {
                ...state
            }
        case "POKEMON_DETAILS":
            return {
                ...state,
                detailsOfPokemons: action.payload
            }
            case "FILTER_DB":
               const AllPokemos = state.pokemons2
                const filterdb = action.payload === "createdDB" ? AllPokemos.filter(el => el.createdDB):AllPokemos.filter(el => !el.createdDB)
                return {
                    ...state,
                    pokemons: action.payload === "All" ? state.pokemons2 : filterdb
                }

        default: return state;
    }
}

export default rootReducer;