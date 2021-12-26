import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { AppRootState } from '../+store/store';

export const AuthRoute = ({ component, isAuthNeeded, isLogged, ...rest }: any) => {
  const RouteComponent = (props: any) => {
    const isLogged = useSelector((state: AppRootState) => state.auth.user);
    const needAuth = !isLogged && isAuthNeeded;
    const noNeedAuth = isLogged && !isAuthNeeded;

    return needAuth || noNeedAuth ? (
      <Redirect to={isAuthNeeded ? '/auth/login' : '/categories'} />
    ) : (
      createElement(component, props)
    );
  };

  return <Route {...rest} component={RouteComponent} />;
};
