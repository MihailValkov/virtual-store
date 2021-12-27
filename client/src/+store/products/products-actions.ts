import { http } from '../../util/http-request';
import { AppDispatch } from '../store';
import {
  loadProducts,
  loading,
  error,
  loadProduct,
  uploadProductImages,
  addNewProduct,
  rateProduct,
} from './products-slice';
import { History } from 'history';
import { addNewCommentToProduct } from '../auth/auth-slice';

export const loadProductsAction = (category: string) => async (dispatch: AppDispatch) => {
  dispatch(loading({ isLoading: true }));
  dispatch(error({ error: null }));
  try {
    const products = await http.get(`categories/${category}`);
    dispatch(loadProducts(products));
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
      const product = await http.get(`categories/${category}/${id}`);
      dispatch(loadProduct(product));
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

export const addNewProductAction =
  (product: {}, history: History) => async (dispatch: AppDispatch) => {
    dispatch(loading({ isLoading: true }));
    dispatch(error({ message: '' }));
    try {
      const response = await http.post('categories/products', product);
      dispatch(addNewProduct({ product: response.product }));
      history.replace('/categories');
    } catch (err: any) {
      dispatch(error({ message: err.message }));
    } finally {
      dispatch(loading(false));
    }
  };

export const rateProductAction =
  (comment: string, rating: number, userId: string, productId: string, onClose: () => void) =>
  async (dispatch: AppDispatch) => {
    dispatch(loading({ isLoading: true }));
    dispatch(error({ message: '' }));
    try {
      if (rating <= 0 || rating > 5) {
        throw new Error('Please select rating for this product!');
      }
      const response = await http.patch(`categories/products/${productId}`, {
        comment,
        rating,
        userId,
      });
      dispatch(rateProduct(response));
      dispatch(addNewCommentToProduct({ productId, comment, rating, status: response.status }));
      onClose();
    } catch (err: any) {
      dispatch(error({ message: err.message }));
    } finally {
      dispatch(loading(false));
    }
  };
