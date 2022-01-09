import { FC } from 'react';
import { Link } from 'react-router-dom';

import noImage from '../../assets/no-image.png';
import styles from './Category.module.css';

const Category: FC<{ category: string; imageUrl: string }> = ({ category, imageUrl }) => {
  return (
    <li className={styles['category']}>
      <h3>{category}</h3>
      <Link to={`/categories/${category.toLocaleLowerCase()}`}>
        <img src={imageUrl || noImage} alt={category} />
      </Link>
    </li>
  );
};

export default Category;
