import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Order.module.css';

const Order: FC<{
  _id: string;
  date: string;
  address: string;
  status: string;
  quantity: number;
  price: number;
}> = ({ _id, date, address, status, quantity, price }) => {
  return (
    <li className={styles.order}>
      <header>
        <h3>Order Number: {_id}</h3>
        <Link to={`/orders/detail/${_id}`}>Order Details</Link>
      </header>
      <div className={styles['order-content']}>
        <div className={`${styles['order-info']} ${styles.left}`}>
          <p>Register Date: {date}</p>
          <p>Address: {address}</p>
          <p>Status: {status}</p>
        </div>
        <div className={`${styles['order-info']} ${styles.right}`}>
          <p>{quantity} x products</p>
          <p className={styles['total-price']}>{(price * quantity).toFixed(2)} BGN</p>
        </div>
      </div>
    </li>
  );
};

export default Order;
