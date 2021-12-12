import { FC, lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

import { authenticateAction } from './+store/auth/auth-actions';
import { AppRootState } from './+store/store';

import Layout from './components/core/Layout';
import LoadingSpinner from './components/shared/LoadingSpinner';

const Auth = lazy(() => import('./pages/Auth/Auth'));
const Categories = lazy(() => import('./pages/Categories/Categories'));
const CartPage = lazy(() => import('./pages/CartPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const Orders = lazy(() => import('./pages/Orders/Orders'));

const App: FC<{}> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppRootState) => state.auth.user);
  const isLogged = !!user;

  useEffect(() => {
    dispatch(authenticateAction());
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Suspense fallback={<LoadingSpinner />}>
          <Route path='/cart' exact component={CartPage} />
          <Route path='/favorites' exact component={FavoritesPage} />
          <Route path='/categories' component={Categories} />
          <Route path='/orders'>
            <Orders />
          </Route>
          <Route path='/auth'>
            <Auth isLogged={isLogged} />
          </Route>
        </Suspense>
      </Switch>
    </Layout>
  );
};

export default App;
