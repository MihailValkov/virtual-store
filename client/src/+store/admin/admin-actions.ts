import { History } from 'history';
import { http } from '../../util/http-request';
import { AppDispatch } from '../store';
import {
  getOrder,
  orderIsLoading,
  orderErrorMessage,
  getOrders,
  ordersIsLoading,
  ordersErrorMessage,
  getUsers,
  usersIsLoading,
  usersErrorMessage
} from './admin-slice';

export const getOrderAction = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(orderIsLoading({ isLoading: true }));
  dispatch(orderErrorMessage({ message: null }));
  try {
    const order = await http.get(`admin/orders/${id}`);
    dispatch(getOrder({ order }));
  } catch (err: any) {
    dispatch(orderErrorMessage({ message: err.message }));
  } finally {
    dispatch(orderIsLoading({ isLoading: false }));
  }
};
export const getOrdersAction = (path: string) => async (dispatch: AppDispatch) => {
  dispatch(ordersIsLoading({ isLoading: true }));
  dispatch(ordersErrorMessage({ message: null }));
  try {
    const { orders, count } = await http.get(path);
    dispatch(getOrders({ orders, count }));
  } catch (err: any) {
    dispatch(ordersErrorMessage({ message: err.message }));
  } finally {
    dispatch(ordersIsLoading({ isLoading: false }));
  }
};

export const getUsersAction = (path: string) => async (dispatch: AppDispatch) => {
  dispatch(usersIsLoading({ isLoading: true }));
  dispatch(usersErrorMessage({ message: null }));
  try {
    const { users, count } = await http.get(path);
    dispatch(getUsers({ users, count }));
  } catch (err: any) {
    dispatch(usersErrorMessage({ message: err.message }));
  } finally {
    dispatch(usersIsLoading({ isLoading: false }));
  }
};
