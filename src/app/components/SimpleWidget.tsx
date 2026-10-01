'use client'
import { GiStarAltar} from "react-icons/gi";
import { SimplePokemonEntity } from "../interface/index"
import { useEffect, useState } from "react"
import Link from "next/link"


export const SimpleWidget = () => {
  
  const [pokemonesFavoritosList,setPokemonesFavoritosList] = useState<SimplePokemonEntity[]>([]);

  const getAllPokemonsFavoritos = async () => {
      const pokemonesFavotiresData = await fetch('/api/pokemons-favoritos').then((res) => res.json());
      setPokemonesFavoritosList(pokemonesFavotiresData.data);
  }

  useEffect(() => {
      getAllPokemonsFavoritos();
  },[]);

  return (
    <>
    {pokemonesFavoritosList.map((pokemones) => (
      <div key={pokemones.id} className="bg-white shadow-xl p-3 sm:min-w-[25%] min-w-full  rounded-2xl border-1 border-gray-50 mx-2">
      <div className="flex flex-col">
        <div>
          <h2 className="font-bold text-gray-600 text-center">{pokemones.name}</h2>
        </div>
        <div className="my-3">
          <div className="flex flex-row items-center justify-center space-x-1 ">
            <div id="icon">
              {/* Icono irá aquí */}
              <GiStarAltar size={50} />
            </div>
            <div id="temp" className="text-center">
              <h4 className="text-4xl"></h4>
              <p className="text-xs text-gray-500">Subtitulo</p>
            </div>
          </div>
        </div>

        <div className="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
            <Link href={`/dashboard/pokemons/${pokemones.name}`} className="text-indigo-600 text-xs font-medium">#{pokemones.id}</Link>
        </div>
        
      </div>
    </div>
    ))}
    </>
  )
}