import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdminOrder } from '../../interfaces/order';
import { IAdminUser, IUser } from '../../interfaces/user';

export interface IAdminState {
  order: IAdminOrder | null;
  orderIsLoading: boolean;
  orderErrorMessage: string | null;
  orders: IAdminOrder[] | null;
  ordersIsLoading: boolean;
  ordersErrorMessage: string | null;
  users: IAdminUser[] | null;
  usersIsLoading: boolean;
  usersErrorMessage: string | null;
  ordersCount: number;
  usersCount: number;
}

export const initialAdminState: IAdminState = {
  order: null,
  orderIsLoading: false,
  orderErrorMessage: null,
  orders: null,
  ordersIsLoading: false,
  ordersErrorMessage: null,
  users: null,
  usersIsLoading: false,
  usersErrorMessage: null,
  ordersCount: 0,
  usersCount: 0,
};

const adminSlice = createSlice({
  initialState: initialAdminState,
  name: 'admin',
  reducers: {
    getOrder: (state: IAdminState, action: PayloadAction<{ order: IAdminOrder }>) => ({
      ...state,
      order: action.payload.order,
    }),
    orderIsLoading: (state: IAdminState, action: PayloadAction<{ isLoading: boolean }>) => ({
      ...state,
      orderIsLoading: action.payload.isLoading,
    }),
    orderErrorMessage: (state: IAdminState, action: PayloadAction<{ message: string | null }>) => ({
      ...state,
      orderErrorMessage: action.payload.message,
    }),
    getOrders: (
      state: IAdminState,
      action: PayloadAction<{ orders: IAdminOrder[]; count: number }>
    ) => ({
      ...state,
      orders: action.payload.orders,
      ordersCount: action.payload.count,
    }),
    ordersIsLoading: (state: IAdminState, action: PayloadAction<{ isLoading: boolean }>) => ({
      ...state,
      ordersIsLoading: action.payload.isLoading,
    }),
    ordersErrorMessage: (
      state: IAdminState,
      action: PayloadAction<{ message: string | null; count?: number }>
    ) => ({
      ...state,
      ordersCount: action.payload.count || state.ordersCount,
      ordersErrorMessage: action.payload.message,
    }),
    clearOrders: (state: IAdminState) => ({ ...state, orders: null }),
    sortOrders: (
      state: IAdminState,
      action: PayloadAction<{
        sorting: string;
        criteria: string;
      }>
    ) => {
      const { criteria, sorting } = action.payload;
      if (criteria === 'action' || !state.orders) {
        return;
      }
      if (
        criteria === '_id' ||
        criteria === 'userId' ||
        criteria === 'username' ||
        criteria === 'deliveryAddress' ||
        criteria === 'createdAt' ||
        criteria === 'status' ||
        criteria === 'paymentMethod'
      ) {
        state.orders.sort((a, b) =>
          sorting === 'asc'
            ? a[criteria].localeCompare(b[criteria])
            : b[criteria].localeCompare(a[criteria])
        );
      } else if (criteria === 'amount' || criteria === 'totalPrice') {
        state.orders.sort((a, b) =>
          sorting === 'asc' ? a[criteria] - b[criteria] : b[criteria] - a[criteria]
        );
      }
      return state;
    },
    getUsers: (
      state: IAdminState,
      action: PayloadAction<{ users: IAdminUser[]; count: number }>
    ) => ({
      ...state,
      users: action.payload.users,
      usersCount: action.payload.count,
    }),
    usersIsLoading: (state: IAdminState, action: PayloadAction<{ isLoading: boolean }>) => ({
      ...state,
      usersIsLoading: action.payload.isLoading,
    }),
    usersErrorMessage: (
      state: IAdminState,
      action: PayloadAction<{ message: string | null; count?: number }>
    ) => ({
      ...state,
      usersCount: action.payload.count || state.usersCount,
      usersErrorMessage: action.payload.message,
    }),
    sortUsers: (
      state: IAdminState,
      action: PayloadAction<{
        sorting: string;
        criteria: string;
      }>
    ) => {
      const { criteria, sorting } = action.payload;
      if (criteria === 'action' || !state.users) {
        return;
      }
      if (
        criteria === '_id' ||
        criteria === 'username' ||
        criteria === 'email' ||
        criteria === 'role' ||
        criteria === 'phone' ||
        criteria === 'address'
      ) {
        state.users.sort((a, b) =>
          sorting === 'asc'
            ? a[criteria].localeCompare(b[criteria])
            : b[criteria].localeCompare(a[criteria])
        );
      } else if (criteria === 'orders' || criteria === 'comments') {
        state.users.sort((a, b) =>
          sorting === 'asc' ? a[criteria] - b[criteria] : b[criteria] - a[criteria]
        );
      }
      return state;
    },
  },
});

export const adminReducer = adminSlice.reducer;
export const {
  getOrder,
  orderIsLoading,
  orderErrorMessage,
  getOrders,
  ordersIsLoading,
  ordersErrorMessage,
  sortOrders,
  clearOrders,
  getUsers,
  usersIsLoading,
  usersErrorMessage,
  sortUsers,
} = adminSlice.actions;
