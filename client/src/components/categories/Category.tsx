import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.module.css';

const Category: FC<{ category: string; imageUrl: string }> = ({ category, imageUrl }) => {
  return (
    <li className={styles['category']}>
      <h3>{category}</h3>
      <Link to={`/categories/${category.toLocaleLowerCase()}`}>
        <img src={imageUrl} alt={category} />
      </Link>
    </li>
  );
};

export default Category;
