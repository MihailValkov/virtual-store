import { http } from '../../util/http-request';
import { AppDispatch } from '../store';
import {
  loadCategories,
  categoriesIsLoading,
  categoriesError,
  addNewCategory,
  addNewCategoryIsLoading,
  addNewCategoryError,
  uploadCategoryImage,
  uploadCategoryImageError,
  uploadCategoryImageIsLoading,
} from './categories-slice';
import { History } from 'history';
import { ICategory } from '../../interfaces/category';

export const loadCategoriesAction = () => async (dispatch: AppDispatch) => {
  dispatch(categoriesIsLoading({ isLoading: true }));
  dispatch(categoriesError({ message: null }));
  try {
    const categories = await http.get('categories');
    dispatch(loadCategories({ categories }));
  } catch (err: any) {
    dispatch(categoriesError({ message: err.message }));
  } finally {
    dispatch(categoriesIsLoading({ isLoading: false }));
  }
};
export const addNewCategoryAction = (category: ICategory) => async (dispatch: AppDispatch) => {
  dispatch(addNewCategoryIsLoading({ isLoading: true }));
  dispatch(addNewCategoryError({ message: null }));
  try {
    const createdCategory = await http.post('categories', category);
    dispatch(addNewCategory({ category: createdCategory }));
  } catch (err: any) {
    dispatch(addNewCategoryError({ message: err.message }));
  } finally {
    dispatch(addNewCategoryIsLoading({ isLoading: false }));
  }
};

export const uploadCategoryImageAction = (formData: FormData) => async (dispatch: AppDispatch) => {
  dispatch(uploadCategoryImageIsLoading({ isLoading: true }));
  dispatch(uploadCategoryImageError({ message: null }));
  try {
    const image = await http.post('upload/categories', formData);
    dispatch(uploadCategoryImage({ image }));
  } catch (err: any) {
    dispatch(uploadCategoryImageError({ message: err.message }));
  } finally {
    dispatch(uploadCategoryImageIsLoading({ isLoading: false }));
  }
};
