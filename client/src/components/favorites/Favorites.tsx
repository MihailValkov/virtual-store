import { FC } from 'react';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import MyProductsList from '../shared/MyProducts/MyProductsList';

import styles from './Favorites.module.css';

const Favorites: FC<{ items: {}[] }> = ({items}) => {
  return (
    <section className={styles['favorites-container']}>
      <AsideMenu />
      <Card classes={styles.favorites}>
        <h1>My Favorites Items</h1>
        <MyProductsList />
      </Card>
    </section>
  );
};

export default Favorites;
