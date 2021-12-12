import { FC } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';

const Auth: FC<{ isLogged: boolean }> = ({ isLogged }) => {
  const { path } = useRouteMatch();

  return <>
  {!isLogged && <Route path={`${path}/login`} component={LoginPage} />}
  {!isLogged && <Route path={`${path}/register`} component={RegisterPage} />}
  {isLogged && <Route path={`${path}/profile`} component={ProfilePage} />}
  </>;
};

export default Auth;
