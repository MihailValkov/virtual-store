import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootState } from '../../+store/store';
import { loadCategoriesAction } from '../../+store/categories/categories-actions';
import CategoryList from '../../components/categories/CategoryList';

const CategoriesPage: FC<{}> = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: AppRootState) => state.categories.categoriesList);
  const isLoading = useSelector((state: AppRootState) => state.categories.categoriesIsLoading);
  const errorMessage = useSelector(
    (state: AppRootState) => state.categories.categoriesErrorMessage
  );

  useEffect(() => {
    dispatch(loadCategoriesAction());
  }, [dispatch]);

  return <CategoryList categories={categories} isLoading={isLoading} errorMessage={errorMessage} />;
};

export default CategoriesPage;
