import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/category';

export interface ICategoriesState {
  categories: ICategory[];
  currentCategoryImage: {
    _id: string;
    url: string;
  };
  categoriesIsLoading: boolean;
  categoriesErrorMessage: string | null;
  uploadImageIsLoading: boolean;
  uploadImageErrorMessage: string | null;
  createCategoryIsLoading: boolean;
  createCategoryErrorMessage: string | null;
}

export const initialCategoriesState: ICategoriesState = {
  categories: [],
  currentCategoryImage: {
    _id: '',
    url: '',
  },
  categoriesIsLoading: true,
  categoriesErrorMessage: null,
  uploadImageIsLoading: false,
  uploadImageErrorMessage: null,
  createCategoryIsLoading: false,
  createCategoryErrorMessage: null,
};

const categoriesSlice = createSlice({
  initialState: initialCategoriesState,
  name: 'category',
  reducers: {
    loadCategories: (state, action) => ({ ...state, categories: action.payload.categories }),
    categoriesIsLoading: (state, action) => ({
      ...state,
      categoriesIsLoading: action.payload.isLoading,
    }),
    categoriesError: (state, action) => ({
      ...state,
      categoriesErrorMessage: action.payload.error,
    }),
    addNewCategory: (state, action) => ({
      ...state,
      categories: state.categories.concat(action.payload.category),
      createCategoryIsLoading: action.payload.isLoading,
    }),
    addNewCategoryIsLoading: (state, action) => ({
      ...state,
      createCategoryIsLoading: action.payload.isLoading,
    }),
    addNewCategoryError: (state, action) => ({
      ...state,
      createCategoryErrorMessage: action.payload.error,
    }),
    uploadCategoryImage: (state, action) => ({
      ...state,
      currentCategoryImage: action.payload.image,
      uploadImageIsLoading: action.payload.isLoading,
    }),
    uploadCategoryImageIsLoading: (state, action) => ({
      ...state,
      uploadImageIsLoading: action.payload.isLoading,
    }),
    uploadCategoryImageError: (state, action) => ({
      ...state,
      uploadImageErrorMessage: action.payload.message,
    }),
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
  loadCategories,
  categoriesIsLoading,
  categoriesError,
  addNewCategory,
  addNewCategoryIsLoading,
  addNewCategoryError,
  uploadCategoryImage,
  uploadCategoryImageError,
  uploadCategoryImageIsLoading,
} = categoriesSlice.actions;
