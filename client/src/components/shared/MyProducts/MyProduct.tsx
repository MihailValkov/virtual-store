import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductFromCart } from '../../../+store/cart/cart-slice';
import { ICartProduct } from '../../../interfaces/cart-product';

import Button from '../Button';
import Color from '../Color';
import StarRating from '../StarRating';

import styles from './MyProduct.module.css';

const MyProduct: FC<{ cart?: boolean; order?: boolean; classes?: string; product: ICartProduct }> =
  ({ cart, order, classes, product }) => {
    const dispatch = useDispatch();

    if (!product) {
      return null;
    }

    const onDeleteProduct = () => {
      dispatch(deleteProductFromCart({ id: product._id }));
    };

    return (
      <li className={`${styles.product} ${classes || ''}`}>
        <div className={styles['product-img-container']}>
          <img src={product.imageUrl} alt={product.title} />
        </div>
        <div className={styles['product-info']}>
          <h3>{product.title}</h3>
          <div className={styles['product-rating']}>
            <span>Rating: </span>
            <StarRating width={product.rating} />
          </div>
          {!order && (
            <div className={styles['product-available']}>
              <span>In Stock:</span>
              {product.inStock ? (
                <span className={styles['product-status']}>Available</span>
              ) : (
                <span className={styles['product-status']}>Not Available</span>
              )}
            </div>
          )}
          <div className={styles['product-color']}>
            <span>Color:</span>
            <Color color={product.color} type='radio' checked />
          </div>
        </div>
        <div className={styles['product-actions']}>
          <div className={styles['product-price-container']}>
            {(cart || order) && (
              <>
                <span>x</span>
                <input
                  className={styles['product-quantity']}
                  type='number'
                  step='1'
                  min='1'
                  value={product.quantity}
                  disabled={order ? true : false}
                />
              </>
            )}
            <p className={styles['product-price']}>{product.price}</p>
          </div>
          <div className={styles['product-taxes']}>
            <p>Taxes: {product.taxes.toFixed(2)} BNG </p>
            <p>
              Total:{' '}
              {product.finalPrice === 0 ? '0.00' : (product.finalPrice).toFixed(2)}{' '}
              BNG{' '}
            </p>
          </div>
          {!order && (
            <div className={styles['product-action']}>
              <Button classes={styles['product-action-favorite']}>
                {cart ? 'Add to Favorites' : 'Add to Cart'}
              </Button>
              <Button onClick={onDeleteProduct} classes={styles['product-action-delete']}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </li>
    );
  };

export default MyProduct;
