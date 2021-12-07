import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../interfaces/order';

export interface IOrdersState {
  ordersList: IOrder[];
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialOrdersState: IOrdersState = {
  ordersList: [],
  isLoading: true,
  errorMessage: null,
};

const ordersSlice = createSlice({
  initialState: initialOrdersState,
  name: 'orders',
  reducers: {
    loadOrders: (state, action) => ({ ...state, ordersList: action.payload.ordersList }),
    loading: (state, action) => ({ ...state, isLoading: action.payload.isLoading }),
    error: (state, action) => ({ ...state, errorMessage: action.payload.message }),
  },
});

export const ordersReducer = ordersSlice.reducer;
export const { loadOrders, loading, error } = ordersSlice.actions;
