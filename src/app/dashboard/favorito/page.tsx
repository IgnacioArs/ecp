import { Metadata } from "next";
import { PokemonsFavoritosGrid } from "../../interface/index";

export const metadata: Metadata = {
  title: "Pokemons Sistems",
  description: "Ver listado de pokemones"
};

export default async function FavoritoPokemonPage(){
        return (
            <div className="flex flex-col " >
                    <PokemonsFavoritosGrid  />
            </div>
        );
}