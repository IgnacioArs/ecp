import { Metadata } from "next";
import {PokemonsGrid, ResultPokemonTopLevel,SimplePokemonEntity} from "@/src/app/interface/index";

export const metadata: Metadata = {
  title: "Pokemons Sistems",
  description: "Ver listado de pokemones"
};

const getPokemons = async (limit=0,offset=0):Promise<SimplePokemonEntity[]> => {
    const data:ResultPokemonTopLevel = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(res => res.json());
    const pokemonsItems = data.results.map(pokemons => ({
        id:pokemons.url.split('/').at(-2)!,
        name:pokemons.name,
        url:pokemons.url,
    }))

    if(pokemonsItems.length ===0){
        throw new Error('Error, Pagina no encontrada.');
    }

    return pokemonsItems;
}

export default async function PokemonsPage() {

    const data = await getPokemons(155);
    
        return (
            <div className="flex flex-col " >
                    <PokemonsGrid  data={data}/>
            </div>
        );
}