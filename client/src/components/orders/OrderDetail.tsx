import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppRootState } from '../../+store/store';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import MyProductsList from '../shared/MyProducts/MyProductsList';

import styles from './OrderDetail.module.css';

const OrderDetail: FC<{}> = (props) => {
  const { id } = useParams<{ id: string }>();
  const ordersList = useSelector((state:AppRootState) => state.orders.ordersList);
  const user = useSelector((state:AppRootState) => state.auth.user);
  const currentOrder = ordersList.find(o => o._id === id);

  return (
    <section className={styles['order-detail']}>
      <AsideMenu />
      <Card classes={styles['order-container']}>
        <h1>Order Details</h1>
        <h3>Order Number: {id}</h3>
        <div className={styles['order-content']}>
          <div>
            <p>
              <span>Register Date:</span> <strong>{currentOrder?.date}</strong>
            </p>
            <p>
              <span>Status:</span> <strong> {currentOrder?.status}</strong>
            </p>
          </div>
          <div>
            <p>
              <span>Address:</span> <strong>{currentOrder?.address}</strong>
            </p>
            <p>
              <span>Name:</span> <strong>{user?.username}</strong>
            </p>
          </div>
          <div>
            <p>
              <span>Amount:</span> <strong>{currentOrder?.totalQuantity}</strong>
            </p>
            <p>
              <span>Total Price:</span> <strong>{currentOrder?.totalPrice} BGN</strong>
            </p>
          </div>
        </div>
        <h2>Products</h2>
        <MyProductsList order classes={styles.product} products={currentOrder!.products} />
        <div className={styles['price']}>
          <div className={styles['total-price']}>
            <p>Total: </p>
            <strong>{(currentOrder!.totalPrice).toFixed(2)} BGN</strong>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default OrderDetail;
