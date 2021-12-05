import { FC } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

const Auth: FC<{ isLogged: boolean }> = ({ isLogged }) => {
  const { path } = useRouteMatch();

  return <></>;
};

export default Auth;
