import { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';
import { AuthRoute } from '../../hocs/isAuth';

const Auth: FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <AuthRoute path={`${path}/login`} isAuthNeeded={false} component={LoginPage} />
      <AuthRoute path={`${path}/register`} isAuthNeeded={false} component={RegisterPage} />
      <AuthRoute path={`${path}/profile`} isAuthNeeded={true} component={ProfilePage} />
    </>
  );
};

export default Auth;
