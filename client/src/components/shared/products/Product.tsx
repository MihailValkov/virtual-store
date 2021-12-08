import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ICategoryProduct } from '../../../interfaces/category-product';
import Card from '../Card';
import StarRating from '../StarRating';
import Button from '../Button';

import styles from './Product.module.css';
import { AppRootState } from '../../../+store/store';
import { useSelector } from 'react-redux';

const Product: FC<{
  product: ICategoryProduct;
  onAddProductToCart: () => void;
  onAddProductToFavorites: () => void;
  onDeleteProductFromFavorites: () => void;
}> = ({ product, onAddProductToCart, onAddProductToFavorites, onDeleteProductFromFavorites }) => {
  const { url } = useRouteMatch();
  const isFavorite = useSelector((state: AppRootState) => state.favorites.products).find(
    (p) => p._id === product._id
  );
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
            <Button classes={styles.btn} icon={faCartArrowDown} onClick={onAddProductToCart} />
            <Button
              classes={`${styles.btn} ${isFavorite && styles.toggle}`}
              icon={faHeart}
              onClick={isFavorite ? onDeleteProductFromFavorites : onAddProductToFavorites}
            />
          </div>
        </Card>
      </Link>
    </li>
  );
};

export default Product;
