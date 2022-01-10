import { createElement, FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { AppRootState } from '../+store/store';
interface IAdminRouteProps {
  component: FC;
  path: string;
  exact?: boolean;
}

export const AdminRoute: FC<IAdminRouteProps> = ({ component, path, exact }) => {
  const RouteComponent = (props: any) => {
    const isAdmin = useSelector((state: AppRootState) => state.auth.user?.role === 'Admin');

    return isAdmin ? createElement(component, props) : <Redirect to={'/categories'} />;
  };

  return <Route path={path} exact={exact} component={RouteComponent} />;
};
