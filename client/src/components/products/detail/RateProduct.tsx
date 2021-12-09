import { FC } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../../shared/Button';

import styles from './RateProduct.module.css';

const RateProduct: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <>
      <h2 className={styles.title}>Rate this product</h2>
      <header className={styles.header}>
        <img
          src='https://s13emagst.akamaized.net/products/32170/32169398/images/res_a0ae106d44c5ef737055bf8ea9146941.jpg'
          alt=''
        />
        <div className={styles.product}>
          <p className={styles['product-name']}>Xiaomi Redmi 9C NFC</p>
          <p className={styles['product-price']}>149.99 BGN</p>
        </div>
        <div className={styles['product-ratings']}>
          <div className={styles['product-rate-wrapper']}>
            <p className={styles['product-rate']}></p>
            <div className={styles['product-rating']}>
              <span>5 star</span>
              <span>45%</span>
            </div>
          </div>
          <div className={styles['product-rate-wrapper']}>
            <p className={styles['product-rate']}></p>
            <div className={styles['product-rating']}>
              <span>4 star</span>
              <span>5%</span>
            </div>
          </div>
          <div className={styles['product-rate-wrapper']}>
            <p className={styles['product-rate']}></p>
            <div className={styles['product-rating']}>
              <span>3 star</span>
              <span>30%</span>
            </div>
          </div>
          <div className={styles['product-rate-wrapper']}>
            <p className={styles['product-rate']}></p>
            <div className={styles['product-rating']}>
              <span>2 star</span>
              <span>15%</span>
            </div>
          </div>
          <div className={styles['product-rate-wrapper']}>
            <p className={styles['product-rate']}></p>
            <div className={styles['product-rating']}>
              <span>1 star</span>
              <span>5%</span>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <h2>Rating</h2>
        <div className={styles['rate-buttons']}>
          <Button icon={faStar} classes={styles.icon} />
          <Button icon={faStar} classes={styles.icon} />
          <Button icon={faStar} classes={styles.icon} />
          <Button icon={faStar} classes={styles.icon} />
          <Button icon={faStar} classes={styles.icon} />
        </div>
        <div className={styles.review}>
          <h3>Write a review</h3>
          <textarea></textarea>
        </div>
      </div>
      <footer className={styles.actions}>
        <Button disabled={false}>Save</Button>
        <Button disabled={false} onClick={onClose}>Cancel</Button>
      </footer>
    </>
  );
};

export default RateProduct;
