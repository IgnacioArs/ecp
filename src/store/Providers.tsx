'use client'
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './index';
import { insertarPokemonesFavoritosPayload } from './favorito/favoritoSlice';

interface Props {
    children:React.ReactNode
}

export const Providers = ({children}:Props) => {

     useEffect(() => {
        //desde aqui llenamos con el payload correspondiente  los pokemones favoritos
         const pokemonesFavoritos = JSON.parse( localStorage.getItem('pokemones-favoritos') ?? '{}'  );    
         store.dispatch(insertarPokemonesFavoritosPayload(pokemonesFavoritos));
     })
   
     return (
            <Provider store={store}>
                    {children}
            </Provider>
     )
}