import { FC } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import LoginPage from './LoginPage';

const Auth: FC<{ isLogged: boolean }> = ({ isLogged }) => {
  const { path } = useRouteMatch();

  return <>{!isLogged && <Route path={`${path}/login`} component={LoginPage} />}</>;
};

export default Auth;
