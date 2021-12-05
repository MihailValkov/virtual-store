import { FC } from 'react';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Order from './Order';
import Card from '../shared/Card';

import styles from './Orders.module.css';

const Orders: FC<{}> = (props) => {
  return (
    <section className={styles['orders-container']}>
      <AsideMenu />
      <Card classes={styles.orders}>
        <h1>My Orders</h1>
        <ul>
          <Order />
          <Order />
          <Order />
        </ul>
      </Card>
    </section>
  );
};

export default Orders;
