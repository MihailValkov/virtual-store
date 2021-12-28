import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppRootState } from '../../+store/store';
import { AdminRoute } from '../../hocs/isAdmin';

import CategoriesPage from './CategoriesPage';
import CategoryPage from './CategoryPage';
import CategoryDetailPage from './CategoryDetailPage';
import CategoryCreatePage from './CategoryCreatePage';

const Categories: FC<{}> = () => {
  const { path } = useRouteMatch();
  const isAdmin = useSelector((state:AppRootState) => state.auth.user?.role === 'Admin');

  return (
    <Switch>
      <Route path={`${path}`} exact component={CategoriesPage} />
      <AdminRoute path={`${path}/products/create`} component={CategoryCreatePage} isAdmin={isAdmin} />
      <Route path={`${path}/:category`} exact component={CategoryPage} />
      <Route path={`${path}/:category/detail/:productId`} component={CategoryDetailPage} />
    </Switch>
  );
};

export default Categories;
