'use client'
import Image from "next/image"
import { SimplePokemonEntity } from "../../index"
import Link from "next/link"
import {
    HiEye
} from "react-icons/hi2";
import {  useAppSelector,useAppDispatch,eliminarFavorito} from "@/src/store/favorito/favoritoSlice";
import { useEffect, useState } from "react";




interface Props {
    data:SimplePokemonEntity
}

export const PokemonsFavoritosCard = ({data}:Props) => {
    //aqui obtenemos el payload y aparte asignamos el metodo para mutar tal payload
    const {pokemones} = useAppSelector(state => state.favoritosSlice);
    const dispatch = useAppDispatch();

    const [isFavorite, setIsFavorite] = useState(false);
    
    const recorrerArrayCorrespondiente = async () => {
            pokemones.map(pokemones => {
                if(pokemones.id === data.id){
                        setIsFavorite(true)
                }
            })
    }

    const eliminarFavoritoItemOnclick = ({data:data}:Props) => {
            dispatch(eliminarFavorito(data.id))
    }

    useEffect(()=> {
            recorrerArrayCorrespondiente();
    },[pokemones]);
    
    return (
           <div className="mx-auto right-0 mt-2 w-60 ">
                        <div className="bg-white rounded overflow-hidden shadow-lg">
                            <div className="text-center p-6 bg-gray-800 border-b">
                                <Image  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} 
                                        width={100} 
                                        height={100} 
                                        alt={data.name}  
                                        className="mx-auto" 
                                        priority={false}/>
        
                                <p className="text-sm text-gray-100">{data.name}</p>
                                <div className="mt-5 flex justify-center">
                                            <Link
                                               href={`/dashboard/pokemons/${data.name}`}
                                               className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 flex items-center justify-center hover:bg-blue-900 cursor-pointer"
                                            >
                                             Ver detalles<HiEye size={18} style={{marginLeft:5}} />
                                            </Link>
                                </div>
                            </div>
                                <div>
                                        <div className="w-full px-4 py-2 pb-4 hover:bg-gray-100 flex items-center gap-2 text-sm font-medium text-gray-800">
                                                <button onClick={() => eliminarFavoritoItemOnclick({data:data})} className="p-2 pl-5 pr-5 bg-transparent border-2 border-red-500 text-red-500 text-lg rounded-lg hover:bg-red-500 hover:text-gray-100 focus:border-4 focus:border-red-300">Eliminar favoritos</button>
                                        </div>
                                </div>
                        </div>
                    </div>
    )
}