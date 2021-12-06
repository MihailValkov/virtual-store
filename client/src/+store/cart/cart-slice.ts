import { createSlice } from '@reduxjs/toolkit';
import { ICartProduct } from '../../interfaces/cart-product';
// import { IUser } from '../../interfaces/user';

export interface ICartState {
  products: ICartProduct[];
  totalPrice: number;
}

export const initialAuthState: ICartState = {
  products: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  initialState: initialAuthState,
  name: 'cart',
  reducers: {
    addProductToCart: (state, action) => {
      const existingProduct = state.products.find((p) => p._id === action.payload.product._id);
      if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.finalPrice =
          existingProduct.quantity * existingProduct.price + existingProduct.taxes;
        state.totalPrice += existingProduct.price;
      } else {
        const finalPrice = 1 * action.payload.product.price + action.payload.product.taxes;
        const newProduct = { ...action.payload.product, finalPrice };
        state.products.push(newProduct);
        state.totalPrice += finalPrice;
      }
      return state;
    },
    deleteProductFromCart: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload.id);
      const product = state.products[index];
      state.totalPrice -= product.price * product.quantity + product.taxes;
      state.products.splice(index, 1);
      return state;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addProductToCart, deleteProductFromCart } = cartSlice.actions;
