import { FC } from 'react';
import { useSelector } from 'react-redux';

import { AppRootState } from '../../+store/store';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import MyProductsList from '../shared/MyProducts/MyProductsList';
import Button from '../shared/Button';

import styles from './Cart.module.css';

const Cart: FC<{ items: {}[] }> = ({ items }) => {
  const products = useSelector((state: AppRootState) => state.cart.products);
  const totalPrice = useSelector((state: AppRootState) => state.cart.totalPrice);
  const totalProducts = useSelector((state: AppRootState) => state.cart.totalProducts);
  const user = useSelector((state: AppRootState) => state.auth.user);


  const taxes = products.length * products[0]?.taxes;

  return (
    <section className={styles['cart-container']}>
      <AsideMenu />
      <Card classes={styles.cart}>
        <h1>My Cart</h1>
        <MyProductsList cart products={products} />
      </Card>
      <Card classes={styles['actions']}>
        <h2>Information</h2>
        <p>
          <span>Total products:</span>
          <span>{totalProducts}</span>
        </p>
        <p>
          <span>Price:</span>
          <span>{totalPrice === 0 ? '0.00' : (totalPrice - taxes).toFixed(2)} BGN</span>
        </p>
        <p>
          <span>Taxes:</span>
          <span>{taxes ? taxes.toFixed(2) : '0.00'} BGN</span>
        </p>
        <p className={styles['line']}></p>
        <div className={styles['total-price']}>
          Total price: <span>{totalPrice ? totalPrice.toFixed(2): '0.00'} BGN</span>
        </div>
        <Button>Continue</Button>
      </Card>
    </section>
  );
};

export default Cart;
