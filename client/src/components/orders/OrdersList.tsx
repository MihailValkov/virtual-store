import { FC } from 'react';
import Order from './Order';
import styles from './OrderList.module.css';

const OrdersList: FC<{}> = (props) => {
  return (
    <ul className={styles['orders-list']}>
      <Order />
      <Order />
      <Order />
    </ul>
  );
};

export default OrdersList;
