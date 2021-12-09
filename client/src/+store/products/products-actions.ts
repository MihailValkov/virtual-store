import { http } from '../../util/http-request';
import { AppDispatch } from '../store';
import { loadProducts, loading, error, loadProduct } from './products-slice';

export const loadProductsAction = (category: string) => async (dispatch: AppDispatch) => {
  dispatch(loading({ isLoading: true }));
  dispatch(error({ error: null }));
  try {
    const data = await http.get(`categories/${category}`);
    dispatch(loadProducts({ products: data }));
  } catch (err: any) {
    dispatch(error({ message: err.message }));
  } finally {
    dispatch(loading({ isLoading: false }));
  }
};
export const loadProductAction = (category: string,id:string) => async (dispatch: AppDispatch) => {
  dispatch(loading({ isLoading: true }));
  dispatch(error({ error: null }));
  try {
    const data = await http.get(`categories/${category}/${id}`);
    dispatch(loadProduct({ product: data }));
  } catch (err: any) {
    dispatch(error({ message: err.message }));
  } finally {
    dispatch(loading({ isLoading: false }));
  }
};
