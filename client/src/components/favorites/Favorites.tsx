import { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../+store/store';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import MyProductsList from '../shared/MyProducts/MyProductsList';

import styles from './Favorites.module.css';

const Favorites: FC<{}> = () => {
  const products = useSelector((state:AppRootState) => state.favorites.products);

  return (
    <section className={styles['favorites-container']}>
      <AsideMenu />
      <Card classes={styles.favorites}>
        <h1>My Favorites Items</h1>
        <MyProductsList products={products} />
      </Card>
    </section>
  );
};

export default Favorites;
