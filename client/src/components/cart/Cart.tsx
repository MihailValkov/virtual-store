import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootState } from '../../+store/store';
import { addProductToCart } from '../../+store/cart/cart-slice';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import MyProductsList from '../shared/MyProducts/MyProductsList';
import Button from '../shared/Button';

import styles from './Cart.module.css';

const items_dummy = [
  {
    _id: 'Prdct_001',
    price: 159.99,
    quantity: 1,
    taxes: 5,
    finalPrice: 0,
    imageUrl:
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_624f129e976b8be5b997ec63be975bbc.jpg',
    title: 'Смартфон Huawei Nova 9',
    rating: 50,
    inStock: true,
    color: 'blue',
    isFavorite: false,
  },
  {
    _id: 'Prdct_002',
    price: 559.99,
    quantity: 1,
    taxes: 5,
    finalPrice: 0,
    imageUrl:
      'http://izitel.bg/image/cache/catalog/Huawei/P30/izi-tel-huawei-p30-pro-black-1000x1000.jpg',
    title: 'Huawei P30 Pro',
    rating: 90,
    inStock: false,
    color: 'black',
    isFavorite: false,
  },
];

const Cart: FC<{ items: {}[] }> = ({ items }) => {
  const products = useSelector((state: AppRootState) => state.cart.products);
  const totalPrice = useSelector((state: AppRootState) => state.cart.totalPrice);
  const totalProducts = useSelector((state: AppRootState) => state.cart.totalProducts);
  const dispatch = useDispatch();

  const taxes = products.length * products[0]?.taxes;

  const addProduct = () => {
    dispatch(addProductToCart({ product: items_dummy[0] }));
  };
  const addProduct1 = () => {
    dispatch(addProductToCart({ product: items_dummy[1] }));
  };

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
          Total price: <span>{totalPrice.toFixed(2) || '0.00'} BGN</span>
        </div>
        <Button>Continue</Button>
        <Button onClick={addProduct}>Add product</Button>
        <Button onClick={addProduct1}>Add product-1</Button>
      </Card>
    </section>
  );
};

export default Cart;
