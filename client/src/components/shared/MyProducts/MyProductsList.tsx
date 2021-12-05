import { FC } from 'react';

import MyProduct from './MyProduct';

import styles from './MyProductsList.module.css';

const MyProductsList: FC<{ cart?: boolean; order?: boolean; classes?: string }> = ({
  cart,
  order,
  classes,
}) => {
  return (
    <ul className={styles['products-container']}>
      <MyProduct cart={cart} order={order} classes={classes}/>
    </ul>
  );
};

export default MyProductsList;
