import { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { AuthRoute } from '../../hocs/isAuth';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';

const Auth: FC<{}> = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <AuthRoute path={`${path}/login`} component={LoginPage} />
      <AuthRoute path={`${path}/register`} component={RegisterPage} />
      <AuthRoute path={`${path}/profile`} isAuthNeeded={true} component={ProfilePage} />
    </>
  );
};

export default Auth;
