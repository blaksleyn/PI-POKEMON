        const { Router } = require('express');
const axios = require('axios').default
const { Pokemon, Types } = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const getApiInfo1 = async () => {
    const urlPokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=60');

    const pokemonInfo = await Promise.all(  
            await urlPokemon.data.results.map(async (el) => {
                const url = await axios.get(el.url)
                const types = url.data.types.map(tipo => tipo.type.name)
                const image = url.data.sprites.back_default
                const strenght = url.data.stats.filter(poke => poke.stat.name === "attack")
                const strenght2 = strenght.map(el => el.base_stat)
                
                return {
                    name: el.name,
                    types,
                    image,
                    id:url.data.id,
                    strenght: strenght2[0]
                   
                }
            }
        )
    )
    return pokemonInfo
};

const getDataBaseInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Types,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
};

const getPokemons1 = async () => {
    const apipokemon = await getApiInfo1();
    const dataBase = await getDataBaseInfo();
  
    const pokeInformation = apipokemon.concat(dataBase);
    return pokeInformation;
};

const getApiInfo2 = async () => {
    const urlPokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=60');

    const pokemonInfo = await Promise.all(
            await urlPokemon.data.results.map(async (el) => {
                const url = await axios.get(el.url)
                const types = url.data.types.map(tipo => tipo.type.name)
                const image = url.data.sprites.back_default
                const hp = url.data.stats.filter(poke => poke.stat.name === "hp")
                const strenght = url.data.stats.filter(poke => poke.stat.name === "attack")
                const defense = url.data.stats.filter(poke => poke.stat.name === "defense")
                const speed = url.data.stats.filter(poke => poke.stat.name === "speed")
                const hp2 = hp.map(el => el.base_stat)
                const strenght2 = strenght.map(el => el.base_stat)
                const defense2 =  defense.map(el => el.base_stat)
                const speed2 = speed.map(el => el.base_stat)
                return {
                    name: el.name,
                    types,
                    image,
                    id: url.data.id,
                    height: url.data.height,
                    weight: url.data.weight,
                    hp: hp2[0],
                    strenght:strenght2[0] ,
                    defense: defense2[0],
                    speed: speed2[0]

                }
            }
        )
    )
    return pokemonInfo
};



const getPokemons2 = async () => {
    const apipokemon = await getApiInfo2();
    const dataBase = await getDataBaseInfo();
    const pokeInformation = apipokemon.concat(dataBase);
    return pokeInformation;
};

router.get("/pokemons", async (req, res) => {
    const name = req.query.name;
    console.log(name)
    const pokemons = await getPokemons1();

    if (name) {
        let pokemonName =  await pokemons.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()) && name.length === poke.name.length);
       pokemonName.length ?
               res.status(200).send(pokemonName):
            res.status(404).send("Este pokemon no esta disponible o no existe, perdon!!!")
    } else {
        res.status(200).send(pokemons)
    }
});

router.post("/pokemon", async (req, res) => {

    let {
        name,
        hp,
        defense,
        strenght,
        speed,
        height,
        weight,
        createdDB,
        types
    } = req.body

    let newPokemon = await Pokemon.create({
        name,
        hp,
        defense,
        strenght,
        speed,
        height,
        weight,
        createdDB
    })
    let typesDB = await Types.findAll({
        where: { name: types }
    })
    newPokemon.addTypes(typesDB)
    res.send("Pokemon creado")
});

router.get("/types", async (req, res) => {
    const typespokemonsapi = await axios.get("https://pokeapi.co/api/v2/type?offset=0&limit=60'");
    const typespokemons = typespokemonsapi.data.results.map(element => element.name);
    typespokemons.forEach(el => {
        Types.findOrCreate({
            where: { name: el },
        })
    })
    const typesofpoke = await Types.findAll();
    res.send(typesofpoke);
});

router.get("/pokemons/:id",  (req, res) => {
    // const { id } = req.params;
    // const pokemons = await getPokemons2();
    // if (id) {
    //     let pokemonID = await pokemons.filter(el => el.id == id);
    //     if (pokemonID.length) {
    //         return res.status(200).json(pokemonID)
    //     }
    //     res.status(404).send("No encontre esta receta")
    // }
    const {id} = req.params;
    getPokemons2().then((pokemons)=> {
        if(id){
            let idd = pokemons.filter(el => el.id == id);
            if(idd.length){
                return res.json(idd)
            }
            res.json("No encontre este Pokemon")
        }
    })
})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
