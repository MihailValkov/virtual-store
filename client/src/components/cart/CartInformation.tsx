import { FC } from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import styles from './CartInformation.module.css';
import { Link } from 'react-router-dom';

const CartInformation: FC<{
  classes?: string;
  totalProducts: number;
  totalPrice: number;
  taxes: number;
}> = ({ classes, totalProducts, totalPrice, taxes }) => {
  return (
    <Card classes={`${styles['actions']} ${classes}`}>
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
        Total price: <span>{totalPrice ? totalPrice.toFixed(2) : '0.00'} BGN</span>
      </div>
      <Link to='/cart/checkout'>Continue</Link>
    </Card>
  );
};

export default CartInformation;
