import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { authReducer, IAuthState } from './auth/auth-slice';
import { cartReducer, ICartState } from './cart/cart-slice';
import { favoritesReducer, IFavoritesState } from './favorites/favorites-slice';
import { IOrdersState, ordersReducer } from './orders/orders-slice';
import { IProductsState, productsReducer } from './products/products-slice';
import { ICategoriesState, categoriesReducer } from './categories/categories-slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'favorites'],
};

const reducers = {
  auth: authReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
  orders: ordersReducer,
  products: productsReducer,
  categories: categoriesReducer,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers(reducers)),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export interface AppRootState {
  readonly auth: IAuthState;
  readonly cart: ICartState;
  readonly favorites: IFavoritesState;
  readonly orders: IOrdersState;
  readonly products: IProductsState;
  readonly categories: ICategoriesState;
}
