import { FC } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import OrdersPage from './OrdersPage';
import OrdersDetailPage from './OrdersDetailPage';

const Orders: FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Route path={`${path}`} exact component={OrdersPage} />
      <Route path={`${path}/detail/:id`} component={OrdersDetailPage} />
    </>
  );
};

export default Orders;
