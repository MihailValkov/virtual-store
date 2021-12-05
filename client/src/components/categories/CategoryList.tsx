import { FC } from 'react';
import Category from './Category';

import styles from './CategoryList.module.css';

const CategoryList: FC<{ categories: { category: string; imageUrl: string }[] }> = ({
  categories,
}) => {
  return (
    <ul className={styles['categories-list']}>
      {categories.map((c) => (
        <Category key={c.category} imageUrl={c.imageUrl} category={c.category} />
      ))}
    </ul>
  );
};

export default CategoryList;
