import { FC } from 'react';
import { useParams } from 'react-router';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import MyProductsList from '../shared/MyProducts/MyProductsList';

import styles from './OrderDetail.module.css';

const OrderDetail: FC<{}> = (props) => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className={styles['order-detail']}>
      <AsideMenu />
      <Card classes={styles['order-container']}>
        <h1>Order Details</h1>
        <h3>Order Number: 123ff234sdf2342asd12</h3>
        <div className={styles['order-content']}>
          <div>
            <p>
              <span>Register Date:</span> <strong>6 may 2021, 11:52</strong>
            </p>
            <p>
              <span>Status:</span> <strong> Approved</strong>
            </p>
          </div>
          <div>
            <p>
              <span>Address:</span> <strong> Bulgaria, Svilengrad</strong>
            </p>
            <p>
              <span>Name:</span> <strong> Mihail Valkov</strong>
            </p>
          </div>
          <div>
            <p>
              <span>Items:</span> <strong> 5</strong>
            </p>
            <p>
              <span>Total Price:</span> <strong>159.99 BGN</strong>
            </p>
          </div>
        </div>
        <h2>Products</h2>
        <MyProductsList order classes={styles.product} />
        <div className={styles['price']}>
          <div className={styles['total-price']}> 
          <p>Total: </p>
          <strong>551.99 BGN</strong>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default OrderDetail;
