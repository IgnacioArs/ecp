// Importamos la interfaz que define la estructura de un Pokémon simple
// Esto nos permite tipar correctamente los datos en TypeScript
import { SimplePokemonEntity } from '@/src/app/interface';

// Importamos createSlice desde Redux Toolkit
// createSlice nos permite crear reducer + acciones automáticamente
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../index';

//METODO PARA PREE CARGAR
// const getInitialState = (): PokemonsState => {
  
//   // if ( typeof localStorage === 'undefined' ) return {};
//   const favorites = JSON.parse( localStorage.getItem('pokemones-favoritos') ?? '{}'  );
//   return favorites;
// }

// =============================
// Definición del estado global
// =============================

// Definimos una interfaz que describe cómo será la estructura
// del estado para los favoritos dentro del store de Redux
interface FavoritoState {
    // Array de pokemones favoritos
    pokemones: SimplePokemonEntity[]
}

// =============================
// Estado inicial
// =============================

// Definimos el estado inicial del slice.
// Aquí comenzamos con un arreglo vacío de pokemones favoritos.
const initialState: FavoritoState = {
    pokemones: []
}

// =============================
// Creación del Slice
// =============================

// createSlice crea:
// - El reducer
// - Las acciones automáticamente
// - El nombre del slice (clave dentro del store)
const favoritosSlice = createSlice({
    // Nombre del slice (aparecerá en Redux DevTools)
    name: 'favoritos',

    // Estado inicial
    initialState,

    // Reducers: aquí irán las funciones que modifican el estado
    // Por ahora está vacío porque aún no hemos definido acciones
    reducers: {

        //esta nueva funcion nos va a ayudar a poder cargar los pokemones que hemos cargado ho tenemos guardado
        insertarPokemonesFavoritosPayload:(state,action:PayloadAction<SimplePokemonEntity[]>) =>{
            state.pokemones = action.payload;
        },

        agregarFavorito: (state, action:PayloadAction<SimplePokemonEntity>) => {
            const existePokemon = state.pokemones.some((pokemones) => pokemones.id ===action.payload.id);
            if(existePokemon ===false){
                state.pokemones.push(action.payload)
            }
        },

        eliminarFavorito:(state,action:PayloadAction<string>) => {
           state.pokemones = state.pokemones.filter((pokemonId) => pokemonId.id != action.payload)
        },

        eliminarTodosMisFavoritos:(state,action:PayloadAction<SimplePokemonEntity[]>) => {
                state.pokemones = action.payload;
        }

        /*
        Ejemplo de cómo se vería un reducer:

        agregarFavorito: (state, action) => {
            state.pokemones.push(action.payload);
        }

        En Redux Toolkit podemos "mutar" el estado directamente
        porque internamente usa Immer para hacerlo inmutable.
        */
    }
})

// =============================
// Exportación de acciones
// =============================

// Aquí se exportan las acciones generadas automáticamente.
// Como no hay reducers definidos aún, está vacío.
export const {
    insertarPokemonesFavoritosPayload,
    agregarFavorito,
    eliminarFavorito,
    eliminarTodosMisFavoritos
} = favoritosSlice.actions;

// =============================
// Exportación del reducer
// =============================

// Exportamos el reducer para registrarlo en el store
export default favoritosSlice.reducer;

// ======================================================
//  ¿Por qué NO usar simplemente useDispatch()?
// ======================================================
//
// Si usamos:
//
//   const dispatch = useDispatch();
//
// TypeScript lo interpreta como:
//   dispatch: Dispatch<any>
//
// Eso significa que podemos despachar cualquier cosa,
// incluso acciones incorrectas o con payload mal tipado,
// y TypeScript NO nos avisará.
//
// Perdemos:
// - Seguridad de tipos
// - Autocompletado correcto
// - Validación de payload
//
// Por eso NO es buena práctica en proyectos con TypeScript.


// ======================================================
//  Hook personalizado tipado para dispatch
// ======================================================
//
// Aquí estamos diciendo:
//
//   "Cada vez que alguien use este hook,
//    el dispatch será exactamente del tipo AppDispatch"
//
// AppDispatch es el tipo REAL del dispatch del store:
//
//   export type AppDispatch = typeof store.dispatch
//
// Esto permite:
// - Autocompletado de acciones
// - Validación del payload
// - Seguridad en tiempo de desarrollo
// - Prevención de errores antes de ejecutar la app
//
export const useAppDispatch: () => AppDispatch = useDispatch;



// ======================================================
//  ¿Por qué NO usar useSelector() directamente?
// ======================================================
//
// Si usamos:
//
//   const data = useSelector(state => state);
//
// TypeScript interpreta `state` como:
//   any
//
// Eso significa que podríamos escribir:
//
//   state.favoritoss.pokemones
//
// (mal escrito)
// y TypeScript NO marcaría error.
//
// Eso es peligroso en aplicaciones grandes.


// ======================================================
//  Hook personalizado tipado para selector
// ======================================================
//
// TypedUseSelectorHook<RootState> le dice a TypeScript:
//
//   "El estado global tiene exactamente la forma RootState"
//
// RootState normalmente es:
//
//   export type RootState = ReturnType<typeof store.getState>
//
// Entonces ahora:
//
//   const pokemones = useAppSelector(state => state.favoritos.pokemones);
//
// TypeScript:
// - Sabe que `favoritos` existe
// - Sabe que `pokemones` es un array
// - Marca error si escribes mal algo
// - Ofrece autocompletado automático
//
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
