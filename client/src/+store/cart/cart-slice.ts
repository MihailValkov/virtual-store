import { createSlice } from '@reduxjs/toolkit';
import { ICartProduct } from '../../interfaces/cart-product';

export interface ICartState {
  products: ICartProduct[];
  totalPrice: number;
  totalProducts: number;
}

export const initialAuthState: ICartState = {
  products: [],
  totalPrice: 0,
  totalProducts: 0,
};

const cartSlice = createSlice({
  initialState: initialAuthState,
  name: 'cart',
  reducers: {
    addProductToCart: (state, action) => {
      const existingProduct = state.products.find((p) => p._id === action.payload.product._id);
      state.totalProducts++;
      if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.finalPrice =
          existingProduct.quantity * existingProduct.price + existingProduct.taxes;
        state.totalPrice += existingProduct.price;
      } else {
        const finalPrice = 1 * action.payload.product.price + action.payload.product.taxes;
        state.products.push({ ...action.payload.product, finalPrice });
        state.totalPrice += finalPrice;
      }
      return state;
    },
    deleteProductFromCart: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload.id);
      const product = state.products[index];
      state.totalProducts -= product.quantity;
      state.totalPrice -= product.price * product.quantity + product.taxes;
      state.totalPrice = state.totalPrice < 0 ? 0 : state.totalPrice;
      state.products.splice(index, 1);
      return state;
    },
    changeProductQuantity: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload.id);
      const product = state.products[index];
      if (action.payload.quantity === 0) {
        state.totalProducts -= product.quantity;
        state.totalPrice -= product.price * product.quantity + product.taxes;
        state.products.splice(index, 1);
      } else {
        if (action.payload.quantity > product.quantity) {
          state.totalPrice += product.price * (action.payload.quantity - product.quantity);
          state.totalProducts += action.payload.quantity - product.quantity;
        } else {
          state.totalPrice -= product.price * (product.quantity - action.payload.quantity);
          state.totalProducts -= product.quantity - action.payload.quantity;
        }
        product.quantity = action.payload.quantity;
        product.finalPrice = product.quantity * product.price + product.taxes;
      }
      return state;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addProductToCart, deleteProductFromCart, changeProductQuantity } = cartSlice.actions;
