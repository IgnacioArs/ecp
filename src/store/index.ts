import { configureStore } from '@reduxjs/toolkit'

import favoritosSlice from './favorito/favoritoSlice'
import { localStorageMiddleware } from './middleware/localStorage-middleware'

export const store = configureStore({
  reducer: {
    //AQUI ADENTRO AGREGAMOS EL SLICE CORRESPONDIENTE.
    favoritosSlice
  },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//EXPORTAMOS EL COMPONENTES DE PROVIDER CREADO  
export {Providers} from './Providers'