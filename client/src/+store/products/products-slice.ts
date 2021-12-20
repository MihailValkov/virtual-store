import { createSlice } from '@reduxjs/toolkit';
import { ICategoryProduct } from '../../interfaces/category-product';

export interface IProductsState {
  productsList: ICategoryProduct[];
  product: ICategoryProduct | null;
  currentImages: {
    images: string[];
    isLoading: boolean;
    error: string;
  };
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialProductsState: IProductsState = {
  productsList: [],
  currentImages: {
    images: [],
    isLoading: false,
    error: '',
  },
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
    uploadProductImages: (state, action) => ({
      ...state,
      currentImages: {
        ...state.currentImages,
        images: action.payload.images,
        isLoading: action.payload.isLoading,
        error: action.payload.error,
      },
    }),
    addNewProduct: (state, action) => {
      const product = action.payload.product;
    },
    rateProduct: (state, action) => {
      if (state.product) {
        state.product.rating = action.payload.rating;
      }
      return state;
    },
    error: (state, action) => ({ ...state, errorMessage: action.payload.message }),
  },
});

export const productsReducer = productsSlice.reducer;
export const {
  loadProducts,
  loadProduct,
  loading,
  error,
  uploadProductImages,
  addNewProduct,
  rateProduct,
} = productsSlice.actions;
