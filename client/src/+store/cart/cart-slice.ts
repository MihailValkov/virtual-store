import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBaseProduct, ICartProduct } from '../../interfaces/cart-product';
export interface ICartState {
  products: ICartProduct[];
  totalPrice: number;
  totalProducts: number;
}

export const initialCartState: ICartState = {
  products: [],
  totalPrice: 0,
  totalProducts: 0,
};

const cartSlice = createSlice({
  initialState: initialCartState,
  name: 'cart',
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<{ product: IBaseProduct; selectedColor: string }>
    ) => {
      const existingProduct = state.products.find((p) => p._id === action.payload.product._id);
      state.totalProducts++;
      if (
        existingProduct &&
        existingProduct?.quantity + 1 < action.payload.product.availablePieces
      ) {
        existingProduct.quantity++;
        existingProduct.finalPrice = Number(
          (existingProduct.quantity * existingProduct.price + existingProduct.taxes).toFixed(2)
        );
        state.totalPrice = Number((state.totalPrice + existingProduct.price).toFixed(2));
      } else if (action.payload.product.availablePieces >= 1) {
        const finalPrice = Number(
          (1 * action.payload.product.price + action.payload.product.taxes).toFixed(2)
        );
        state.products.push({
          ...action.payload.product,
          finalPrice,
          quantity: 1,
          selectedColor: action.payload.selectedColor,
        });
        state.totalPrice = Number((state.totalPrice + finalPrice).toFixed(2));
      }
      return state;
    },
    deleteProductFromCart: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload.id);
      const product = state.products[index];
      state.totalProducts -= product.quantity;
      state.totalPrice =
        state.totalPrice - Number((product.price * product.quantity + product.taxes).toFixed(2));
      state.products.splice(index, 1);
      return state;
    },
    changeProductQuantity: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload.id);
      const product = state.products[index];
      if (action.payload.quantity === 0) {
        state.totalProducts -= product.quantity;
        state.totalPrice =
          state.totalPrice - Number((product.price * product.quantity + product.taxes).toFixed(2));
        state.products.splice(index, 1);
      } else if (action.payload.quantity <= product.availablePieces) {
        if (action.payload.quantity > product.quantity) {
          state.totalPrice =
            Number(state.totalPrice.toFixed(2)) +
            Number((product.price * (action.payload.quantity - product.quantity)).toFixed(2));
          state.totalProducts += action.payload.quantity - product.quantity;
        } else {
          state.totalPrice =
            Number(state.totalPrice.toFixed(2)) -
            Number((product.price * (product.quantity - action.payload.quantity)).toFixed(2));
          state.totalProducts -= product.quantity - action.payload.quantity;
        }
        product.quantity = action.payload.quantity;
        product.finalPrice = Number((product.quantity * product.price + product.taxes).toFixed(2));
      }
      return state;
    },
    changeSelectedColorToCart: (
      state,
      action: PayloadAction<{ productId: string; selectedColor: string }>
    ) => {
      const existingProduct = state.products.find((p) => p._id === action.payload.productId);
      if (existingProduct) {
        existingProduct.selectedColor = action.payload.selectedColor;
      }
      return state;
    },
    clearCart: () => initialCartState,
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addProductToCart,
  deleteProductFromCart,
  changeProductQuantity,
  changeSelectedColorToCart,
  clearCart
} = cartSlice.actions;
