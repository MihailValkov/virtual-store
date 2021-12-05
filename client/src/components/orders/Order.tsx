import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Order.module.css';

const Order: FC<{}> = (props) => {
  return (
    <li className={styles.order}>
      <header>
        <h3>Order Number: 123ff234sdf2342asd12</h3>
        <Link to='/orders/detail/some-id'>Order Details</Link>
      </header>
      <div className={styles['order-content']}>
        <div className={`${styles['order-info']} ${styles.left}`}>
          <p>Register Date: 6 may 2021, 11:52</p>
          <p>Address: Bulgaria, Svilengrad</p>
          <p>Status: Pending</p>
        </div>
        <div className={`${styles['order-info']} ${styles.right}`}>
          <p> 5 x items</p>
          <p className={styles['total-price']}>159.99 BGN</p>
        </div>
      </div>
    </li>
  );
};

export default Order;
