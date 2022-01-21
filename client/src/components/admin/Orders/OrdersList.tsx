import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useQuery } from '../../../hooks/useQuery';
import { useHistory, useRouteMatch } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../../+store/store';
import { getOrdersAction } from '../../../+store/admin/admin-actions';
import { sortOrders } from '../../../+store/admin/admin-slice';

import Table from '../Table';
import Pagination from '../../shared/Pagination';
import SearchBar from '../../shared/SearchBar';
import Card from '../../shared/Card';

import styles from './OrdersList.module.css';

const headers = {
  _id: 'Order Id',
  userId: 'User Id',
  username: 'Username',
  deliveryAddress: 'Delivery Address',
  createdAt: 'Register Date',
  status: 'Status',
  paymentMethod: 'Payment Method',
  amount: 'Total Products',
  totalPrice: 'Total Price',
  action: 'Actions',
};

const OrdersList: FC<{}> = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const [sorting, setSorting] = useState('asc');
  const [search, setSearch] = useState('');
  const limit = Number(query.get('limit') || 2);
  const filter = query.get('filter') || '_id';
  const page = Number(query.get('page') || 1);
  const orders = useSelector((state: AppRootState) => state.admin.orders);
  const count = useSelector((state: AppRootState) => state.admin.ordersCount);
  const pages = Math.ceil(count / limit) || 1;

  const changeLimitHandler = useCallback(
    ({ currentTarget: { value } }: FormEvent<HTMLSelectElement>) =>
      history.push(`${path}?page=${page}&limit=${value}`),
    [history, path, page]
  );
  const changeFilterHandler = useCallback(
    ({ currentTarget: { value } }: FormEvent<HTMLSelectElement>) =>
      history.push(`${path}?page=${page}&limit=${limit}&filter=${value}`),
    [history, path, page, limit]
  );

  const changeSearchValueHandler = useCallback(
    ({ currentTarget: { value } }: FormEvent<HTMLInputElement>) => setSearch(value),
    []
  );

  const sortByCriteria = useCallback(
    (criteria: string) => {
      setSorting((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      dispatch(sortOrders({ criteria, sorting: sorting === 'asc' ? 'desc' : 'asc' }));
    },
    [dispatch, sorting]
  );

  useEffect(() => {
    dispatch(getOrdersAction(`admin/orders?page=${page}&limit=${limit}`));
  }, [dispatch, page, limit]);

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(
        getOrdersAction(
          `${path.slice(1)}?page=${page}&limit=${limit}&search=${search}&filter=${filter}`
        )
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, path, page, limit, search, filter]);

  return (
    <section>
      <SearchBar
        onChangeLimit={changeLimitHandler}
        limitValue={limit}
        onChangeFilter={changeFilterHandler}
        filterValue={filter}
        onChangeInputValue={changeSearchValueHandler}
        inputValue={search}
      />
      <Card classes={styles['orders-container']}>
        <Table headers={headers} content={orders} onSort={sortByCriteria} sorting={sorting} />
        <Pagination classes={styles.paginator} currentPage={page} pages={pages} limit={limit} />
      </Card>
    </section>
  );
};

export default OrdersList;
