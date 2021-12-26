import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../interfaces/order';

export interface IOrdersState {
  ordersList: IOrder[];
  order: IOrder | null;
  lastOrderId: string;
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialOrdersState: IOrdersState = {
  ordersList: [],
  order: null,
  lastOrderId: '',
  isLoading: true,
  errorMessage: null,
};

const ordersSlice = createSlice({
  initialState: initialOrdersState,
  name: 'orders',
  reducers: {
    loadOrders: (state, action) => ({ ...state, ordersList: action.payload.ordersList }),
    loadOrder: (state, action) => ({ ...state, order: action.payload.order }),
    createOrder: (state, action) => {
      state.ordersList.push(action.payload.order);
      state.lastOrderId = action.payload.order._id;
      return state;
    },
    loading: (state, action) => ({ ...state, isLoading: action.payload.isLoading }),
    error: (state, action) => ({ ...state, errorMessage: action.payload.message }),
  },
});

export const ordersReducer = ordersSlice.reducer;
export const { loadOrders, loadOrder, loading, error, createOrder } = ordersSlice.actions;
