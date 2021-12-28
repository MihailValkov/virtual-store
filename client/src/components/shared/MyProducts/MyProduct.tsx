import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../hooks/use-input';
import { isNumberValidation } from '../../../util/validations';
import { ICartProduct } from '../../../interfaces/cart-product';
import { AppRootState } from '../../../+store/store';
import {
  addProductToCart,
  changeProductQuantity,
  changeSelectedColorToCart,
  deleteProductFromCart,
} from '../../../+store/cart/cart-slice';
import {
  addProductToFavorites,
  changeSelectedColorToFavorites,
  deleteProductFromFavorites,
} from '../../../+store/favorites/favorites-slice';

import Button from '../Button';
import StarRating from '../StarRating';
import Colors from '../Colors';

import { faHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './MyProduct.module.css';

const MyProduct: FC<{
  cart?: boolean;
  order?: boolean;
  classes?: string;
  product: ICartProduct;
}> = ({ cart, order, classes, product }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: AppRootState) => state.favorites.products).find(
    (p) => p._id === product._id
  );

  const onChangeSelectedColor = (obj: { [prop: string]: string }) => {
    if (cart) {
      dispatch(
        changeSelectedColorToCart({
          productId: product._id,
          selectedColor: obj.color,
        })
      );
    } else {
      dispatch(
        changeSelectedColorToFavorites({
          productId: product._id,
          selectedColor: obj.color,
        })
      );
    }
  };

  const { changeHandler, value } = useInput(isNumberValidation);

  const onAddProductToCart = () => {
    dispatch(addProductToCart({ product, selectedColor: product.selectedColor }));
  };

  const onDeleteProductFromCart = () => {
    dispatch(deleteProductFromCart({ id: product._id }));
  };

  const onAddProductToFavorites = () => {
    dispatch(addProductToFavorites({ product, selectedColor: product.selectedColor }));
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
    <li className={`${styles.product} ${classes}`}>
      <Link
        className={`${styles['product-img-container']} ${!cart && styles['left']}`}
        to={`/categories/${product.category}/detail/${product._id}`}
      >
        <img src={product.images[0]} alt={product.name} />
      </Link>
      <div className={styles['product-info']}>
        <h3>{product.name}</h3>
        <div className={styles['product-rating']}>
          <span>Rating: </span>
          <StarRating width={product.rating} show />
        </div>
        {!order && (
          <div className={styles['product-available']}>
            <span>In Stock:</span>
            {product.availablePieces > 0 ? (
              <span className={styles['product-status']}>Available</span>
            ) : (
              <span className={`${styles['product-status']} ${styles['unavailable']}`}>
                Not Available
              </span>
            )}
          </div>
        )}

        <div className={styles['product-color']}>
          <span>Color:</span>
          <Colors
            classes={styles['select-color']}
            colors={product.colors}
            selectedColor={product.selectedColor}
            inputType='radio'
            onSelectColor={onChangeSelectedColor}
          />
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
          <p className={styles['product-price']}>{(product?.price || 0).toFixed(2)}</p>
        </div>
        <div className={styles['product-taxes']}>
          <p>Taxes: {product.taxes ? product.taxes.toFixed(2) : '0.00'} BNG </p>
          <p>
            Total:{' '}
            {product.finalPrice
              ? product.finalPrice.toFixed(2)
              : !cart
              ? (product.price + product.taxes).toFixed(2)
              : '0.00'}{' '}
            BNG{' '}
          </p>
        </div>
        {!order && (
          <div className={styles['product-action']}>
            <Button
              classes={`${styles['product-action-favorite']} ${
                isFavorite && styles['highlighted']
              }`}
              onClick={
                cart
                  ? isFavorite
                    ? onDeleteProductFromFavorites
                    : onAddProductToFavorites
                  : onAddProductToCart
              }
              icon={cart ? faHeart : null}
            >
              {cart ? 'Favorite' : 'Add to Cart'}
            </Button>

            <Button
              onClick={cart ? onDeleteProductFromCart : onDeleteProductFromFavorites}
              classes={styles['product-action-delete']}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default MyProduct;
