import { FC, lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import { authenticateAction } from './+store/auth/auth-actions';
import { AppRootState } from './+store/store';

import Layout from './components/core/Layout';
import LoadingSpinner from './components/shared/LoadingSpinner';

const AuthPages = lazy(() => import('./pages/Auth/Auth'));
const AdminPages = lazy(() => import('./pages/Admin/Admin'));
const CategoriesPages = lazy(() => import('./pages/Categories/Categories'));
const CartPages = lazy(() => import('./pages/Cart/CartPages'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const OrdersPages = lazy(() => import('./pages/Orders/Orders'));

const App: FC<{}> = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: AppRootState) => state.auth.isLoading);

  useEffect(() => {
    dispatch(authenticateAction());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <Switch>
        <Suspense fallback={<LoadingSpinner />}>
          <Route path='/' exact>
            <Redirect to='/categories' />
          </Route>
          <Route path='/categories' component={CategoriesPages} />
          <Route path='/cart'>
            <CartPages />
          </Route>
          <Route path='/favorites' exact component={FavoritesPage} />
          <Route path='/orders' component={OrdersPages} />
          <Route path='/auth'>
            <AuthPages />
          </Route>
          <Route path='/admin'>
            <AdminPages />
          </Route>
        </Suspense>
      </Switch>
    </Layout>
  );
};

export default App;
