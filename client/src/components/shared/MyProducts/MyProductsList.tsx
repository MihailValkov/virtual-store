import { FC } from 'react';
import { ICartProduct } from '../../../interfaces/cart-product';

import MyProduct from './MyProduct';

import styles from './MyProductsList.module.css';

const MyProductsList: FC<{
  cart?: boolean;
  order?: boolean;
  classes?: string;
  products: ICartProduct[];
}> = ({ cart, order, classes, products }) => {
  return (
    <ul className={styles['products-container']}>
      {products.map((p) => (
        <MyProduct key={p._id} cart={cart} order={order} classes={classes} product={p} />
      ))}
    </ul>
  );
};

export default MyProductsList;
