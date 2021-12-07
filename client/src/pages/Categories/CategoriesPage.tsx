import { FC, useEffect, useState } from 'react';

import CategoryList from '../../components/categories/CategoryList';
import { ICategory } from '../../interfaces/category';
import { http } from '../../util/http-request';

const CategoriesPage: FC<{}> = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    http.get('categories').then((data) => setCategories(data));
  }, []);
  
  return <CategoryList categories={categories} />;
};

export default CategoriesPage;
