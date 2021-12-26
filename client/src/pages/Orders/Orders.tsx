import { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';

import OrdersPage from './OrdersPage';
import OrdersDetailPage from './OrdersDetailPage';
import { AuthRoute } from '../../hocs/isAuth';

const Orders: FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <AuthRoute path={`${path}`} exact isAuthNeeded={true} component={OrdersPage} />
      <AuthRoute path={`${path}/detail/:id`} isAuthNeeded={true} component={OrdersDetailPage} />
    </>
  );
};

export default Orders;
