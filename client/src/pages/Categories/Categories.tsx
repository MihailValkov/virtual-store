import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AdminRoute } from '../../hocs/isAdmin';

import CategoriesPage from './CategoriesPage';
import CategoryPage from './CategoryPage';
import CategoryDetailPage from './CategoryDetailPage';
import CategoryCreatePage from './CategoryCreatePage';
import AddCategoryPage from './AddCategoryPage';

const Categories: FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact component={CategoriesPage} />
      <AdminRoute path={`${path}/create`} component={AddCategoryPage} />
      <AdminRoute path={`${path}/products/create`} component={CategoryCreatePage} />
      <Route path={`${path}/:category`} exact component={CategoryPage} />
      <Route path={`${path}/:category/detail/:productId`} component={CategoryDetailPage} />
    </Switch>
  );
};

export default Categories;
