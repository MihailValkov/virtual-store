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
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = Number(query.get('page') || 1);
  const limit = Number(query.get('limit') || 2);
  const filter = query.get('filter') || '';
  const sorting = query.get('sorting') || 'asc';
  const search = query.get('search') || '';
  const criteria = query.get('criteria') || '_id';
  const orders = useSelector((state: AppRootState) => state.admin.orders);
  const count = useSelector((state: AppRootState) => state.admin.ordersCount);
  const isLoading = useSelector((state: AppRootState) => state.admin.ordersIsLoading);
  const errorMessage = useSelector((state: AppRootState) => state.admin.ordersErrorMessage);
  const pages = Math.ceil(count / limit) || 1;

  const changeQueryParamHandler = useCallback(
    (
      type: 'limit' | 'filter' | 'search',
      { currentTarget: { value } }: FormEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      let url = '';
      if (type === 'limit') {
        url = `/admin/orders?page=${page}&limit=${value}&filter=${filter}&criteria=${criteria}&sorting=${sorting}&search=${search}`;
      } else if (type === 'filter') {
        url = `/admin/orders?page=${page}&limit=${limit}&filter=${value}&criteria=${criteria}&sorting=${sorting}&search=${search}`;
      } else if (type === 'search') {
        url = `/admin/orders?page=${page}&limit=${limit}&filter=${filter}&criteria=${criteria}&sorting=${sorting}&search=${value}`;
      }
      history.push(url);
    },
    [history, page, limit, filter, criteria, sorting, search]
  );

  const sortByCriteria = useCallback(
    (sortCriteria: string) => {
      const sort = sorting === 'asc' ? 'desc' : 'asc';
      history.push(
        `/admin/orders?page=${page}&limit=${limit}&filter=${filter}&criteria=${sortCriteria}&sorting=${sort}&search=${search}`
      );
    },
    [history, page, limit, filter, sorting, search]
  );

  useEffect(() => {
    dispatch(getOrdersAction(`admin/orders?page=${page}&limit=${limit}`));
  }, [dispatch, page, limit]);

  useEffect(() => {
    dispatch(sortOrders({ criteria, sorting }));
  }, [dispatch, criteria, sorting]);

  useEffect(() => {
    let timer = setTimeout(() => {
      filter &&
        dispatch(
          getOrdersAction(
            `admin/orders?page=${page}&limit=${limit}&search=${search}&filter=${filter}`
          )
        );
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, search, filter]);

  return (
    <section>
      <SearchBar
        onChangeLimit={changeQueryParamHandler.bind(null, 'limit')}
        limitValue={limit}
        onChangeFilter={changeQueryParamHandler.bind(null, 'filter')}
        filterValue={filter}
        onChangeInputValue={changeQueryParamHandler.bind(null, 'search')}
        inputValue={search}
      />
      <Card classes={styles['orders-container']}>
        <Table
          headers={headers}
          content={orders}
          onSort={sortByCriteria}
          sorting={sorting}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <Pagination
          classes={styles.paginator}
          path='/admin/orders'
          currentPage={page}
          pages={pages}
          limit={limit}
        />
      </Card>
    </section>
  );
};

export default OrdersList;
