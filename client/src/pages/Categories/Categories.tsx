import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CategoriesPage from './CategoriesPage';
import CategoryPage from './CategoryPage';
import CategoryDetailPage from './CategoryDetailPage';
import CategoryCreatePage from './CategoryCreatePage';

const Categories: FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact component={CategoriesPage} />
      <Route path={`${path}/product/create`} exact component={CategoryCreatePage} />
      <Route path={`${path}/:category`} exact component={CategoryPage} />
      <Route path={`${path}/:category/detail/:productId`} component={CategoryDetailPage} />
    </Switch>
  );
};

export default Categories;
