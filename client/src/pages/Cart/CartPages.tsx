import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';

const CartPages: FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact component={CartPage} />
      <Route path={`${path}/checkout`} exact component={CheckoutPage} />
    </Switch>
  );
};

export default CartPages;
