import { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { AdminRoute } from '../../hocs/isAdmin';
import OrdersList from '../../components/admin/Orders/OrdersList';
import UsersList from '../../components/admin/Users/UsersList';
import Test from '../../components/admin/test/Test';

const Admin: FC<{}> = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <AdminRoute path={`${path}/orders`} component={OrdersList} />
      <AdminRoute path={`${path}/users??page=${1}&limit=${10}`} component={UsersList} />
      <AdminRoute path={`${path}/test`} component={Test} />
      {/* <AuthRoute path={`${path}/register`} component={RegisterPage} />
      <AuthRoute path={`${path}/profile`} isAuthNeeded={true} component={ProfilePage} /> */}
    </>
  );
};

export default Admin;
