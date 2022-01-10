import { createElement, FC } from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';
import { AppRootState } from '../+store/store';
interface IAuthRouteProps {
  component: FC<any>;
  isAuthNeeded: boolean;
  path: string;
  exact?: boolean;
}

export const AuthRoute: FC<IAuthRouteProps> = ({ component, isAuthNeeded, path, exact }) => {
  const RouteComponent = (props: any) => {
    const isLogged = useSelector((state: AppRootState) => !!state.auth.user);

    const needAuth = !isLogged && isAuthNeeded;
    const noNeedAuth = isLogged && !isAuthNeeded;
    const navigate = isAuthNeeded ? '/auth/login' : '/categories';

    return needAuth || noNeedAuth ? (
      <Redirect to={navigate} />
    ) : (
      createElement(component, { ...props })
    );
  };

  return <Route path={path} exact={exact} component={RouteComponent} />;
};
