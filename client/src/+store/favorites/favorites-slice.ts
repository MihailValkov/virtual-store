import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      index === -1 &&
        state.products.push({
          ...action.payload.product,
          selectedColor: action.payload.selectedColor,
        });
      return state;
    },
    deleteProductFromFavorites: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload.id);
      index > -1 && state.products.splice(index, 1);
      return state;
    },
    changeSelectedColorToFavorites: (
      state,
      action: PayloadAction<{ productId: string; selectedColor: string }>
    ) => {
      const existingProduct = state.products.find((p) => p._id === action.payload.productId);
      if (existingProduct) {
        existingProduct.selectedColor = action.payload.selectedColor;
      }
      return state;
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const { addProductToFavorites, deleteProductFromFavorites, changeSelectedColorToFavorites } =
  favoritesSlice.actions;
