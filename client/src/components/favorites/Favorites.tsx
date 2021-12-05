import { FC } from 'react';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';

import styles from './Favorites.module.css';

const Favorites: FC<{ items: {}[] }> = ({items}) => {
  return (
    <section className={styles['favorites-container']}>
      <AsideMenu />
      <Card classes={styles.favorites}>
        <h1>My Favorites Items</h1>
        ITEMS....
      </Card>
    </section>
  );
};

export default Favorites;
