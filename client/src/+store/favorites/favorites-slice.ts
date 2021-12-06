import { createSlice } from '@reduxjs/toolkit';
import { ICartProduct } from '../../interfaces/cart-product';

export interface IFavoritesState {
  products: ICartProduct[];
}

export const initialAuthState: IFavoritesState = {
  products: [],
};

const favoritesSlice = createSlice({
  initialState: initialAuthState,
  name: 'favorites',
  reducers: {
    addProductToFavorites: (state, action) => {
      const index = state.products.findIndex((p) => p._id === action.payload.product._id);
      index === -1 && state.products.push(action.payload.product);
      return state;
    },
    deleteProductFromFavorites: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload.id);
      index > -1 && state.products.splice(index, 1);
      return state;
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const { addProductToFavorites, deleteProductFromFavorites } = favoritesSlice.actions;
