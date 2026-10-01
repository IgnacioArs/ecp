import { NextResponse } from "next/server";
import { SimplePokemonEntity } from "../../interface";


export async function GET(request:Request) {
    const arrayListRestFullApiPokemonesFavoritos:SimplePokemonEntity[] = [
            {id: '1', name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
            {id: '2', name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/'}
    ] 

    return NextResponse.json({
        data:arrayListRestFullApiPokemonesFavoritos,
        message:'Lista de pokemones favoritos',
        status:200
    })
}