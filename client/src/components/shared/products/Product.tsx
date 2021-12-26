import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ICategoryProduct } from '../../../interfaces/category-product';
import Card from '../Card';
import StarRating from '../StarRating';
import Button from '../Button';

import styles from './Product.module.css';
import { AppRootState } from '../../../+store/store';
import { useSelector } from 'react-redux';
import { IBaseProduct } from '../../../interfaces/cart-product';

const Product: FC<{
  product: ICategoryProduct;
  onAddProductToCart: (product: IBaseProduct) => void;
  onAddProductToFavorites: (product: IBaseProduct) => void;
  onDeleteProductFromFavorites: () => void;
}> = ({ product, onAddProductToCart, onAddProductToFavorites, onDeleteProductFromFavorites }) => {
  const { category } = useParams<{ category: string }>();
  const { rating, ...others } = product;
  const productRating = (rating?.totalRating / rating?.comments?.length) * 20 || 0;
  const isFavorite = useSelector((state: AppRootState) => state.favorites.products).find(
    (p) => p._id === product._id
  );
  return (
    <li className={styles['product']}>
      <Card>
        <Link className={styles.overlay} to={`/categories/${category}/detail/${product._id}`} />
        <div className={styles.content}>
          <h3>{product.name}</h3>
          <img src={product.images[0]} alt='product img' />
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>{product.price} BGN</p>
          <StarRating width={productRating} />
        </div>
        <div className={styles.actions}>
          <Button
            classes={styles.btn}
            icon={faCartArrowDown}
            onClick={onAddProductToCart.bind(null, { ...others, rating: productRating })}
          />
          <Button
            classes={`${styles.btn} ${isFavorite && styles.toggle}`}
            icon={faHeart}
            onClick={
              isFavorite
                ? onDeleteProductFromFavorites
                : onAddProductToFavorites.bind(null, { ...others, rating: productRating })
            }
          />
        </div>
      </Card>
    </li>
  );
};

export default Product;
