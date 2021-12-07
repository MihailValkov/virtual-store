import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth-slice';
import { cartReducer } from './cart/cart-slice';
import { favoritesReducer } from './favorites/favorites-slice';
import { ordersReducer } from './orders/orders-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    orders: ordersReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
