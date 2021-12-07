import { FC } from 'react';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Order from './Order';
import Card from '../shared/Card';

import styles from './Orders.module.css';

const orders_dummy = [
  {
    _id: '123ff234sdf2342asd11',
    date: '06 May 2021, 16:52',
    address: 'Bulgaria, Sofia',
    status: 'Pending',
    amount: 5,
    totalPrice: 1029.99,
  },
  {
    _id: '123ff234sdf2342asd12',
    date: '03 June 2021, 11:00',
    address: 'Bulgaria, Burgas',
    status: 'Pending',
    amount: 1,
    totalPrice: 159.99,
  },
  {
    _id: '123ff234sdf2342asd13',
    date: '01 Jan 2021, 10:55',
    address: 'Bulgaria, Burgas',
    status: 'Pending',
    amount: 3,
    totalPrice: 655.99,
  },
];

const Orders: FC<{}> = (props) => {
  return (
    <section className={styles['orders-container']}>
      <AsideMenu />
      <Card classes={styles.orders}>
        <h1>My Orders</h1>
        <ul>
          {orders_dummy.map((order) => (
            <Order
              key={order._id}
              _id={order._id}
              date={order.date}
              address={order.address}
              status={order.status}
              amount={order.amount}
              totalPrice={order.totalPrice}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default Orders;
