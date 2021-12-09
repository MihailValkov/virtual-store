import { createSlice } from '@reduxjs/toolkit';
import { ICategoryProduct } from '../../interfaces/category-product';

export interface IProductsState {
  productsList: ICategoryProduct[];
  product: ICategoryProduct | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialProductsState: IProductsState = {
  productsList: [],
  product: null,
  isLoading: true,
  errorMessage: null,
};

const productsSlice = createSlice({
  initialState: initialProductsState,
  name: 'products',
  reducers: {
    loadProducts: (state, action) => ({ ...state, productsList: action.payload.products }),
    loadProduct: (state, action) => ({ ...state, product: action.payload.product }),
    loading: (state, action) => ({ ...state, isLoading: action.payload.isLoading }),
    error: (state, action) => ({ ...state, errorMessage: action.payload.message }),
  },
});

export const productsReducer = productsSlice.reducer;
export const { loadProducts,loadProduct, loading, error } = productsSlice.actions;
