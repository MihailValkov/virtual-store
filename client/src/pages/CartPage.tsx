import { FC } from 'react';
import Cart from '../components/cart/Cart';

const items = [{}];
const CartPage: FC<{}> = (props) => {
  return <Cart items={items}/>;
};

export default CartPage;
