import { FC, lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

import { authenticateAction } from './+store/auth/auth-actions';
import { AppRootState } from './+store/store';

import Layout from './components/core/Layout';
import LoadingSpinner from './components/shared/LoadingSpinner';

const Auth = lazy(() => import('./pages/Auth/Auth'));
const Categories = lazy(() => import('./pages/Categories'));

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
        <Route path='/categories' exact component={Categories} />
          <Route path='/auth'>
            <Auth isLogged={isLogged} />
          </Route>
        </Suspense>
      </Switch>
    </Layout>
  );
};

export default App;
