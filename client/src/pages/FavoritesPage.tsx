import { FC } from 'react';

import Favorites from '../components/favorites/Favorites';

const items = [{}];

const FavoritesPage: FC<{}> = () => {
  return <Favorites items={items} />;
};

export default FavoritesPage;
