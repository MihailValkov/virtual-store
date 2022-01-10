import { FC, useCallback } from 'react';
import { ICategory } from '../../interfaces/category';

import Category from './Category';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorModal from '../shared/ErrorModal';

import styles from './CategoryList.module.css';
import { useDispatch } from 'react-redux';
import { categoriesError } from '../../+store/categories/categories-slice';

const CategoryList: FC<{
  categories: ICategory[];
  isLoading: boolean;
  errorMessage: string | null;
}> = ({ categories, isLoading, errorMessage }) => {
  const dispatch = useDispatch();
  
  const onClearError = useCallback(() => dispatch(categoriesError({ message: null })), [dispatch]);

  if (errorMessage && !isLoading) {
    return <ErrorModal header='Error' errorMessage={errorMessage} onCloseModal={onClearError} />;
  }

  if (isLoading && !errorMessage) {
    return <LoadingSpinner />;
  }

  return (
    <ul className={styles['categories-list']}>
      {categories.map((c) => (
        <Category key={c._id} imageUrl={c.image?.url} category={c.category} />
      ))}
    </ul>
  );
};

export default CategoryList;
