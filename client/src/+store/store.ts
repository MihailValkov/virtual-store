import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth-slice';
import { cartReducer } from './cart/cart-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
