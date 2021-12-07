import { FC } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import CategoriesPage from './CategoriesPage';
import CategoryPage from './CategoryPage';

const Categories: FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Route path={`${path}`} exact component={CategoriesPage} />
      <Route path={`${path}/:category`} exact component={CategoryPage} />
      <Route path={`${path}/:category/details/:productId`} component={CategoryPage} />
    </>
  );
};

export default Categories;
