import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Order.module.css';

const Order: FC<{
  _id: string;
  date: string;
  address: string;
  status: string;
  totalQuantity: number;
  totalPrice: number;
}> = ({ _id, date, address, status, totalQuantity, totalPrice }) => {
  return (
    <li className={styles.order}>
      <header>
        <h3>Order Number: {_id}</h3>
        <Link to={`/orders/detail/${_id}`}>Order Details</Link>
      </header>
      <div className={styles['order-content']}>
        <div className={`${styles['order-info']} ${styles.left}`}>
          <p>Register Date: {new Date(date).toLocaleString()}</p>
          <p>Address: {address}</p>
          <p>Status: {status}</p>
        </div>
        <div className={`${styles['order-info']} ${styles.right}`}>
          <p>{totalQuantity} x products</p>
          <p className={styles['total-price']}>{totalPrice.toFixed(2)} BGN</p>
        </div>
      </div>
    </li>
  );
};

export default Order;
