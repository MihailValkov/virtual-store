import { FC } from 'react';
import { ICartProduct } from '../../../interfaces/cart-product';

import MyProduct from './MyProduct';

import noProductsImg from '../../../assets/no-products.png';
import styles from './MyProductsList.module.css';

const MyProductsList: FC<{
  cart?: boolean;
  order?: boolean;
  classes?: string;
  products: ICartProduct[];
}> = ({ cart, order, classes, products }) => {
  
  if (products.length === 0) {
    return (
      <div className={styles['no-products']}>
        <img src={noProductsImg} alt='product' />
      </div>
    );
  }

  return (
    <ul className={styles['products-container']}>
      {products.map((p) => (
        <MyProduct key={p._id} cart={cart} order={order} classes={classes} product={p} />
      ))}
    </ul>
  );
};

export default MyProductsList;
