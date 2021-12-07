import { http } from '../../util/http-request';
import { AppDispatch } from '../store';
import { loadOrders, loading, error } from './orders-slice';

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
