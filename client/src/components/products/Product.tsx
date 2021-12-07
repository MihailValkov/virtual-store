import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ICategoryProduct } from '../../interfaces/category-product';
import Card from '../shared/Card';
import StarRating from '../shared/StarRating';
import Button from '../shared/Button';

import styles from './Product.module.css';

const Product: FC<{ product: ICategoryProduct }> = ({ product }) => {
  const { url } = useRouteMatch();
  return (
    <li className={styles['product']}>
      <Link to={`${url}/details/${product._id}`}>
        <Card>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h3>{product.name}</h3>
            <img src={product.images[0]} alt='product img' />
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>{product.price} BGN</p>
            <StarRating width={product.rating} />
          </div>
          <div className={styles.actions}>
            <Button classes={styles.btn} icon={faCartArrowDown} />
            <Button classes={styles.btn} icon={faHeart} />
          </div>
        </Card>
      </Link>
    </li>
  );
};

export default Product;
