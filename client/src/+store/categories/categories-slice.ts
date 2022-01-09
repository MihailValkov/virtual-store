import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/category';

export interface ICategoriesState {
  categoriesList: ICategory[];
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
  categoriesList: [],
  currentCategoryImage: {
    _id: '',
    url: '',
  },
  categoriesIsLoading: false,
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
    loadCategories: (state, action: PayloadAction<{ categories: ICategory[] }>) => ({
      ...state,
      categoriesList: action.payload.categories,
    }),
    categoriesIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => ({
      ...state,
      categoriesIsLoading: action.payload.isLoading,
    }),
    categoriesError: (state, action: PayloadAction<{ message: string | null }>) => ({
      ...state,
      categoriesErrorMessage: action.payload.message,
    }),
    addNewCategory: (state, action: PayloadAction<{ category: ICategory }>) => ({
      ...state,
      categoriesList: state.categoriesList.concat(action.payload.category),
    }),
    addNewCategoryIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => ({
      ...state,
      createCategoryIsLoading: action.payload.isLoading,
    }),
    addNewCategoryError: (state, action: PayloadAction<{ message: string | null }>) => ({
      ...state,
      createCategoryErrorMessage: action.payload.message,
    }),
    uploadCategoryImage: (
      state,
      action: PayloadAction<{ image: { _id: string; url: string } }>
    ) => ({
      ...state,
      currentCategoryImage: action.payload.image,
    }),
    uploadCategoryImageIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => ({
      ...state,
      uploadImageIsLoading: action.payload.isLoading,
    }),
    uploadCategoryImageError: (state, action: PayloadAction<{ message: string | null }>) => ({
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
