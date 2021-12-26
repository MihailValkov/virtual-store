import { FC, useEffect } from 'react';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Order from './Order';
import Card from '../shared/Card';

import styles from './Orders.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../+store/store';
import { loadOrdersAction } from '../../+store/orders/orders-actions';

const Orders: FC<{}> = (props) => {
  const orders = useSelector((state: AppRootState) => state.orders.ordersList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOrdersAction());
  }, [dispatch]);

  return (
    <section className={styles['orders-container']}>
      <AsideMenu />
      <Card classes={styles.orders}>
        <h1>My Orders</h1>
        <ul>
          {orders.map((order) => (
            <Order
              key={order._id}
              _id={order._id}
              date={order.createdAt}
              address={order.deliveryAddress}
              status={order.status}
              totalQuantity={order.products.length}
              totalPrice={order.totalPrice}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default Orders;
