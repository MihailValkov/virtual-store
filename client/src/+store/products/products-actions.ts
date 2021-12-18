import { http } from '../../util/http-request';
import { AppDispatch } from '../store';
import {
  loadProducts,
  loading,
  error,
  loadProduct,
  uploadProductImages,
  addNewProduct,
} from './products-slice';

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
export const loadProductAction =
  (category: string, id: string) => async (dispatch: AppDispatch) => {
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
export const uploadProductImagesAction =
  (formData: FormData, onSetImage: (src: string) => void) => async (dispatch: AppDispatch) => {
    dispatch(uploadProductImages({ images: [], isLoading: true, error: '' }));
    try {
      const response = await http.post('upload/products', formData);
      dispatch(uploadProductImages({ images: response.images, isLoading: false, error: '' }));
      onSetImage(response.images[0]);
    } catch (err: any) {
      dispatch(uploadProductImages({ images: [], isLoading: false, error: err.message }));
    }
  };

export const addNewProductAction = (product: {}) => async (dispatch: AppDispatch) => {
  dispatch(loading(true));
  dispatch(error({ message: '' }));
  try {
    const response = await http.post('categories/product', product);
    dispatch(addNewProduct({ product: response.product }));
  } catch (err: any) {
    dispatch(error({ message: err.message }));
  } finally {
    dispatch(loading(false));
  }
};
