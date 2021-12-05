import { FC } from 'react';

import Button from '../Button';
import Color from '../Color';
import StarRating from '../StarRating';

import styles from './MyProduct.module.css';

const MyProduct: FC<{ cart?: boolean; order?: boolean; classes?: string }> = ({
  cart,
  order,
  classes,
}) => {
  return (
    <li className={`${styles.product} ${classes || ''}`}>
      <div className={styles['product-img-container']}>
        <img
          src='https://s13emagst.akamaized.net/products/32170/32169398/images/res_624f129e976b8be5b997ec63be975bbc.jpg'
          alt=''
        />
      </div>
      <div className={styles['product-info']}>
        <h3>Смартфон Huawei Nova 9</h3>
        <div className={styles['product-rating']}>
          <span>Rating: </span>
          <StarRating width={90} />
        </div>
        {!order && (
          <div className={styles['product-available']}>
            <span>In Stock:</span>
            <span className={styles['product-status']}>Available</span>
          </div>
        )}
        <div className={styles['product-color']}>
          <span>Color:</span>
          <Color color='black' type='radio' checked />
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
                defaultValue='1'
                disabled={order ? true : false}
              />
            </>
          )}
          <p className={styles['product-price']}>159.99 BNG</p>
        </div>
        <div className={styles['product-taxes']}>
          <p>Taxes: 5.00 BNG </p>
          <p>Total: 164.99 BNG </p>
        </div>
        {!order && (
          <div className={styles['product-action']}>
            <Button classes={styles['product-action-favorite']}>
              {cart ? 'Add to Favorites' : 'Add to Cart'}
            </Button>
            <Button classes={styles['product-action-delete']}>Delete</Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default MyProduct;
