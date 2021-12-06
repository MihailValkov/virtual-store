import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../hooks/use-input';
import { isNumberValidation } from '../../../util/validations';
import { ICartProduct } from '../../../interfaces/cart-product';
import {
  addProductToCart,
  changeProductQuantity,
  deleteProductFromCart,
} from '../../../+store/cart/cart-slice';

import Button from '../Button';
import Color from '../Color';
import StarRating from '../StarRating';

import styles from './MyProduct.module.css';
import { AppRootState } from '../../../+store/store';
import {
  addProductToFavorites,
  deleteProductFromFavorites,
} from '../../../+store/favorites/favorites-slice';

const MyProduct: FC<{ cart?: boolean; order?: boolean; classes?: string; product: ICartProduct }> =
  ({ cart, order, classes, product }) => {
    const dispatch = useDispatch();
    const isFavorite = useSelector((state: AppRootState) => state.favorites.products).find(
      (p) => p._id === product._id
    );

    const { changeHandler, value } = useInput(isNumberValidation);

    const onAddProductToCart = () => {
      dispatch(addProductToCart({ product }));
    };

    const onDeleteProductFromCart = () => {
      dispatch(deleteProductFromCart({ id: product._id }));
    };

    const onAddProductToFavorites = () => {
      dispatch(addProductToFavorites({ product }));
    };
    const onDeleteProductFromFavorites = () => {
      dispatch(deleteProductFromFavorites({ id: product._id }));
    };

    useEffect(() => {
      if (value) {
        dispatch(changeProductQuantity({ id: product._id, quantity: Number(value) }));
      }
    }, [value, dispatch, product._id]);

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
                  min='0'
                  step='1'
                  value={product.quantity}
                  disabled={order ? true : false}
                  onChange={changeHandler}
                />
              </>
            )}
            <p className={styles['product-price']}>{product.price}</p>
          </div>
          <div className={styles['product-taxes']}>
            <p>Taxes: {product.taxes.toFixed(2)} BNG </p>
            <p>Total: {product.finalPrice === 0 ? '0.00' : product.finalPrice.toFixed(2)} BNG </p>
          </div>
          {!order && (
            <div className={styles['product-action']}>
              <Button
                classes={styles['product-action-favorite']}
                onClick={
                  cart
                    ? isFavorite
                      ? onDeleteProductFromFavorites
                      : onAddProductToFavorites
                    : onAddProductToCart
                }
              >
                {cart ? (isFavorite ? 'Delete from Favorites' : 'Add to Favorites') : 'Add to Cart'}
              </Button>
              {!cart && (
                <Button
                  onClick={cart ? onDeleteProductFromCart : onDeleteProductFromFavorites}
                  classes={styles['product-action-delete']}
                >
                  {cart ? 'Delete from cart' : 'Delete from favorites'}
                </Button>
              )}
            </div>
          )}
        </div>
      </li>
    );
  };

export default MyProduct;
