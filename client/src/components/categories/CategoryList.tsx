import { FC } from 'react';
import { ICategory } from '../../interfaces/category';
import Category from './Category';

import styles from './CategoryList.module.css';

const CategoryList: FC<{ categories: ICategory[] }> = ({
  categories,
}) => {
  return (
    <ul className={styles['categories-list']}>
      {categories.map((c) => (
        <Category key={c._id} imageUrl={c.imageUrl} category={c.category} />
      ))}
    </ul>
  );
};

export default CategoryList;
