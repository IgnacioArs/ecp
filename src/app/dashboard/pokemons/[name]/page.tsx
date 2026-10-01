import { PokemonDetallesTopLevel, ResultPokemonTopLevel } from "@/src/app/interface";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";


interface Props {
  params: {
    name: string;
  };
}

//AQUI REALIZAMOS EL SIGUIENTE COMANDO POR DEFECTO QUE NOS ENTREGA NEXTJS
export async function generateStaticParams() {
 
  const data:ResultPokemonTopLevel = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`).then(res => res.json());
  
  return data.results.map((pokemon) => ({
    name: pokemon.name
  }));
}


export async function generateMetadata({params}:Props):Promise<Metadata> {
    //obtenemos los parametros correspondientes
    const { name } = await params;
    //aqui obtenemos el numero correspondiente del pokemon
   

    try {
        return {
            title:`${name}`,
            description:`Este es el pokemon: ${name}`
        }
    } catch (error) {
        return {
            title:`Fail pokemon`,
            description:`${error}`
        }
    } 

}

const getPokemon = async (
  nombre: string
): Promise<PokemonDetallesTopLevel> => {

  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`,{cache:'force-cache'}).then(response => response.json());
      const data:PokemonDetallesTopLevel = await response;

      if(!data){
            throw new Error('Error, Pagina no encontrada.');
      }
      return data;
  } catch (error) {
      notFound();
  }

};

export default async function PokemonIdPage({ params }: Props) {
 
  //obtenemos los parametros correspondientes
  const { name } = await params;
  //desde aqui ya obtenemos la data correspondiente
  const pokemon = await getPokemon(name);
  
  return (
<div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ''}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />


            <div className="flex flex-wrap">
              {
                pokemon.moves.map(move => (
                  <p key={move.move.name} className="mr-2 capitalize">{move.move.name}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {
                pokemon.types.map(type => (
                  <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {
                pokemon.weight
              }
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>



        </div>
      </div>
    </div>
  );
}
