import { FC } from 'react';
import { useSelector } from 'react-redux';

import { AppRootState } from '../../+store/store';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import MyProductsList from '../shared/MyProducts/MyProductsList';
import CartInformation from './CartInformation';

import styles from './Cart.module.css';

const Cart: FC<{}> = () => {
  const products = useSelector((state: AppRootState) => state.cart.products);
  const totalPrice = useSelector((state: AppRootState) => state.cart.totalPrice);
  const totalProducts = useSelector((state: AppRootState) => state.cart.totalProducts);
  const taxes = products.length * products[0]?.taxes;

  return (
    <section className={styles['cart-container']}>
      <AsideMenu />
      <Card classes={styles.cart}>
        <h1>My Cart</h1>
        <MyProductsList cart products={products} />
      </Card>
      {products.length > 0 && (
        <CartInformation totalPrice={totalPrice} totalProducts={totalProducts} taxes={taxes} />
      )}
    </section>
  );
};

export default Cart;
