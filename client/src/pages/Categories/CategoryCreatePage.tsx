import { FC } from 'react';
import useCategories from '../../hooks/useCategories';
import Create from '../../components/products/create/Create';

const CategoryCreatePage: FC<{}> = () => {
  const categories = useCategories();

  return <Create />;
};

export default CategoryCreatePage;
