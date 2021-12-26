import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { AppRootState } from '../+store/store';

export const AdminRoute = ({ component, ...rest }: any) => {
  const RouteComponent = (props: any) => {
    const isAdmin = useSelector((state: AppRootState) => state.auth.user?.role === 'Admin');
    return isAdmin ? createElement(component, props) : <Redirect to={'/categories'} />;
  };

  return <Route {...rest} component={RouteComponent} />;
};
