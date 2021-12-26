import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { loadOrderAction } from '../../+store/orders/orders-actions';
import { AppRootState } from '../../+store/store';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import LoadingSpinner from '../shared/LoadingSpinner';
import MyProductsList from '../shared/MyProducts/MyProductsList';

import styles from './OrderDetail.module.css';

const OrderDetail: FC<{}> = (props) => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: AppRootState) => state.auth.user);
  const currentOrder = useSelector((state: AppRootState) => state.orders.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOrderAction(id));
  }, [dispatch, id]);

  if (!currentOrder) {
    return <LoadingSpinner />;
  }

  return (
    <section className={styles['order-detail']}>
      <AsideMenu />
      <Card classes={styles['order-container']}>
        <h1>Order Details</h1>
        <h3>Order Number: {id}</h3>
        <div className={styles['order-content']}>
          <div>
            <p>
              <span>Register Date:</span>{' '}
              <strong>{new Date(currentOrder?.createdAt).toLocaleString()}</strong>
            </p>
            <p>
              <span>Status:</span> <strong> {currentOrder?.status}</strong>
            </p>
          </div>
          <div>
            <p>
              <span>Address:</span> <strong>{currentOrder?.deliveryAddress}</strong>
            </p>
            <p>
              <span>Name:</span> <strong>{user?.username}</strong>
            </p>
          </div>
          <div>
            <p>
              <span>Amount:</span> <strong>{currentOrder?.products.length}</strong>
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
            <strong>{currentOrder!.totalPrice.toFixed(2)} BGN</strong>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default OrderDetail;
