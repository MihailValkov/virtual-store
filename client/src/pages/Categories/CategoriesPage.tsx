import { FC } from 'react';
import useCategories from '../../hooks/useCategories';
import CategoryList from '../../components/categories/CategoryList';

const CategoriesPage: FC<{}> = () => {
  const categories = useCategories();

  return <CategoryList categories={categories} />;
};

export default CategoriesPage;
