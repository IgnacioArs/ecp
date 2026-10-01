import { PokemonsCard, SimplePokemonEntity } from "../../index"

interface Props {
    data:SimplePokemonEntity[]
}
export const PokemonsGrid = ({data}:Props) => {
  return (
            <div className="flex flex-wrap gap-10 items-center justify-center">
                    {data.map(pokemons=> 
                            <PokemonsCard key={pokemons.id} data={pokemons} />    
                    )}
            </div>
  )
}

