import { FC } from 'react';
import { AdminRoute } from '../../hocs/isAdmin';
import OrdersList from '../../components/admin/Orders/OrdersList';
import UsersList from '../../components/admin/Users/UsersList';

const Admin: FC<{}> = () => {
  return (
    <>
      <AdminRoute path={'/admin/orders'} component={OrdersList} />
      <AdminRoute path={'/admin/users?page=1&limit=10'} component={UsersList} />
    </>
  );
};

export default Admin;
