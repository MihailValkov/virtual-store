import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { AuthRoute } from '../../hocs/isAuth';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';

const CartPages: FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact component={CartPage} />
      <AuthRoute path={`${path}/checkout`} exact isAuthNeeded={true} component={CheckoutPage} />
    </Switch>
  );
};

export default CartPages;
