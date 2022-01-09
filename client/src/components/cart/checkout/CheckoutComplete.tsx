import { FC } from 'react';
import { Link } from 'react-router-dom';

import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSpinner from '../../shared/LoadingSpinner';

import checkmarkPng from '../../../assets/checkmark.png';
import notCheckmarkPng from '../../../assets/not-checkmark.png';
import styles from './CheckoutComplete.module.css';

const CheckoutComplete: FC<{ orderId?: string; isLoading: boolean; errorMessage: string | null }> =
  ({ orderId, isLoading, errorMessage }) => {
    let statusContent = (
      <div className={styles['order-status']}>
        <h2>Thank you for ordering in our website.</h2>
        <img src={checkmarkPng} alt='logo' />
        <h3>Order Number: {orderId}</h3>
      </div>
    );
    if (isLoading && !errorMessage) {
      statusContent = (
        <>
          <div className={styles['order-status']}>
            <h2>Your order is being processed.</h2>
            <LoadingSpinner className={styles.loading} />
          </div>
          <h3>Please wait.</h3>
        </>
      );
    }
    if (!isLoading && errorMessage) {
      statusContent = (
        <>
          <div className={styles['order-status']}>
            <h2>We're so sorry, it looks like your order couldn't be completed.</h2>
            <img src={notCheckmarkPng} alt='logo' />
          </div>
          <h3>{errorMessage}</h3>
        </>
      );
    }

    return (
      <section className={styles['order-complete']}>
        <div className={styles['order-status']}>{statusContent}</div>
        {!isLoading && !errorMessage && (
          <div className={styles.actions}>
            <Link to='/categories'>
              <FontAwesomeIcon icon={faCartArrowDown} className={styles.icon} />
              Continue shopping
            </Link>
            <Link to='/orders'>
              <FontAwesomeIcon icon={faCartArrowDown} className={styles.icon} />
              My Orders
            </Link>
          </div>
        )}
      </section>
    );
  };

export default CheckoutComplete;
