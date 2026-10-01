import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";
export const localStorageMiddleware: Middleware =
  (state) => (next) => (action) => {
    
  next(action);

  if (typeof action === "object" && action !== null && "type" in action) {
      const {favoritosSlice} = state.getState() as RootState;
      /* console.log("Action type:", action.type, "favoritosSlice", favoritosSlice.pokemones); */
      localStorage.setItem('pokemones-favoritos',JSON.stringify(favoritosSlice.pokemones));
      return;
  }
};