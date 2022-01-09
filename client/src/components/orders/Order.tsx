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
        <Link to={`/orders/detail/${_id}`}>
          <h3>Order Number: {_id}</h3>
          <p>Order Details</p>
        </Link>
      </header>
      <div className={styles['order-content']}>
        <div className={`${styles['order-info']} ${styles.left}`}>
          <p>
            <span>Register Date:</span> <span>{new Date(date).toLocaleString()}</span>
          </p>
          <p>
            <span>Address:</span> <span>{address}</span>
          </p>
          <p>
            <span>Status:</span> <span>{status}</span>
          </p>
        </div>
        <div className={`${styles['order-info']} ${styles.right}`}>
          <p>{totalQuantity} x product{totalQuantity === 1 ? '' : 's'}</p>
          <p className={styles['total-price']}>{totalPrice.toFixed(2)} BGN</p>
        </div>
      </div>
    </li>
  );
};

export default Order;
