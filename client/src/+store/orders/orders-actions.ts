import { ICreateOrder, IOrder } from '../../interfaces/order';
import { http } from '../../util/http-request';
import { updateUserOrdersList } from '../auth/auth-slice';
import { clearCart } from '../cart/cart-slice';
import { AppDispatch } from '../store';
import { loadOrders, loading, error, createOrder, loadOrder } from './orders-slice';

export const loadOrdersAction = () => async (dispatch: AppDispatch) => {
  dispatch(loading({ isLoading: true }));
  dispatch(error({ error: null }));
  try {
    const data = await http.get('orders');
    dispatch(loadOrders({ ordersList: data }));
  } catch (err: any) {
    dispatch(error({ message: err.message }));
  } finally {
    dispatch(loading({ isLoading: false }));
  }
};

export const loadOrderAction = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(loading({ isLoading: true }));
  dispatch(error({ error: null }));
  try {
    const data = await http.get(`orders/${id}`);
    dispatch(loadOrder({ order: data }));
  } catch (err: any) {
    dispatch(error({ message: err.message }));
  } finally {
    dispatch(loading({ isLoading: false }));
  }
};

export const createOrdersAction = (order: ICreateOrder) => async (dispatch: AppDispatch) => {
  dispatch(loading({ isLoading: true }));
  dispatch(error({ error: null }));
  try {
    const data = await http.post('orders', order);
    dispatch(createOrder({ order: data }));
    dispatch(updateUserOrdersList(data._id));
    dispatch(clearCart());
  } catch (err: any) {
    dispatch(error({ message: err.message }));
  } finally {
    dispatch(loading({ isLoading: false }));
  }
};
