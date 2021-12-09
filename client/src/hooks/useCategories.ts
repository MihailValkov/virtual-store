import { useEffect, useState } from 'react';
import { ICategory } from '../interfaces/category';
import { http } from '../util/http-request';

const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    http.get('categories').then((data: ICategory[]) => setCategories(data));
  }, []);

  return categories;
};

export default useCategories;
