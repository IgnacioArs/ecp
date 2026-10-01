'use client'
import { useAppSelector,eliminarTodosMisFavoritos,useAppDispatch } from "@/src/store/favorito/favoritoSlice";
import { PokemonsFavoritosCard } from "../../index"
import { useEffect } from "react";


export const PokemonsFavoritosGrid = () => {
  
        const {pokemones} = useAppSelector(state => state.favoritosSlice);
        const dispatch = useAppDispatch();
        
        const onclickELiminarFavoritos = () => {
                dispatch(eliminarTodosMisFavoritos([]));
        }

        useEffect(()=> {
        },[pokemones]);

        return (
            <div className="flex flex-wrap gap-10 items-center justify-center">
                <button onClick={onclickELiminarFavoritos} className="w-full p-2 pl-5 pr-5 bg-transparent border-2 border-red-500 text-red-500 text-lg rounded-lg hover:bg-red-500 hover:text-gray-100 focus:border-4 focus:border-red-300">Eliminar todos</button>
                    {pokemones.map(pokemons=> 
                            <PokemonsFavoritosCard key={pokemons.id} data={pokemons} />    
                    )}
            </div>
        )
}