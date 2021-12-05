import { FC } from 'react';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import MyProductsList from '../shared/MyProducts/MyProductsList';
import Button from '../shared/Button';

import styles from './Cart.module.css';

const Cart: FC<{items: {}[]}> = ({items}) => {
  return (
    <section className={styles['cart-container']}>
      <AsideMenu />
      <Card classes={styles.cart}>
        <h1>My Cart</h1>
        <MyProductsList cart />
      </Card>
      <Card classes={styles['actions']}>
        <h2>Information</h2>
        <p>
          <span>Total items:</span>
          <span>5</span>
        </p>
        <p>
          <span>Price:</span>
          <span>559.99 BGN</span>
        </p>
        <p>
          <span>Taxes:</span>
          <span>5.00 BGN</span>
        </p>
        <p className={styles['line']}></p>
        <div className={styles['total-price']}>
          Total price: <span>564.99 BGN</span>
        </div>
        <Button>Continue</Button>
      </Card>
    </section>
  );
};

export default Cart;