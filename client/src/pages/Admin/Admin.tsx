import { FC } from 'react';
import { AdminRoute } from '../../hocs/isAdmin';
import OrdersList from '../../components/admin/Orders/OrdersList';
import UsersList from '../../components/admin/Users/UsersList';

const Admin: FC<{}> = () => {
  return (
    <>
      <AdminRoute path={'/admin/orders'} component={OrdersList} />
      <AdminRoute path={'/admin/users'} component={UsersList} />
    </>
  );
};

export default Admin;
