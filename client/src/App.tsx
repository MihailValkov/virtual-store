import { FC, lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

import { authenticateAction } from './+store/auth/auth-actions';
import { AppRootState } from './+store/store';

import Layout from './components/core/Layout';
import LoadingSpinner from './components/shared/LoadingSpinner';

const AuthPage = lazy(() => import('./pages/Auth/AuthPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));


const App: FC<{}> = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: AppRootState) => !!state.auth.user);

  useEffect(() => {
    dispatch(authenticateAction());
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Suspense fallback={<LoadingSpinner />}>
        <Route path='/categories' exact component={CategoriesPage} />
        <Route path='/cart' exact component={CartPage} />
        <Route path='/favorites' exact component={FavoritesPage} />
        <Route path='/orders' exact component={OrdersPage} />
          <Route path='/auth'>
            <AuthPage isLogged={isLogged} />
          </Route>
        </Suspense>
      </Switch>
    </Layout>
  );
};

export default App;
