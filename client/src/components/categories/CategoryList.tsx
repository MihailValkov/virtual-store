import { FC } from 'react';
import Card from '../shared/Card';
import Category from './Category';

import styles from './CategoryList.module.css';

const CategoryList: FC<{ categories: { category: string; imageUrl: string }[] }> = ({
  categories,
}) => {
  return (
    <Card classes={styles['categories-container']}>
      <h2>All Categories</h2>
      <ul className={styles['categories-list']}>
        {categories.map((c) => (
          <Category key={c.category} imageUrl={c.imageUrl} category={c.category} />
        ))}
      </ul>
    </Card>
  );
};

export default CategoryList;
