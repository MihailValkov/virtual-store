import { FC } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const AuthPage: FC<{ isLogged: boolean }> = ({ isLogged }) => {
  const { path } = useRouteMatch();

  return <>
  {!isLogged && <Route path={`${path}/login`} component={LoginPage} />}
  {!isLogged && <Route path={`${path}/register`} component={RegisterPage} />}
  </>;
};

export default AuthPage;
