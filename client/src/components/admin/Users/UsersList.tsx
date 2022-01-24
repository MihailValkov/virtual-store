import { FC, FormEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { useQuery } from '../../../hooks/useQuery';
import { AppRootState } from '../../../+store/store';
import { getUsersAction } from '../../../+store/admin/admin-actions';
import { sortUsers } from '../../../+store/admin/admin-slice';

import Card from '../../shared/Card';
import SearchBar from '../../shared/SearchBar';
import Pagination from '../../shared/Pagination';
import Table from '../Table';

import styles from './UsersList.module.css';

const headers = {
  _id: 'User Id',
  username: 'Username',
  email: 'Email',
  phone: 'Phone',
  address: 'Address',
  orders: 'Total Orders',
  comments: 'Product Reviews',
  role: 'Role',
  action: 'Actions',
};

const UsersList: FC<{}> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = Number(query.get('page') || 1);
  const limit = Number(query.get('limit') || 2);
  const filter = query.get('filter') || '';
  const sorting = query.get('sorting') || 'asc';
  const search = query.get('search') || '';
  const criteria = query.get('criteria') || '_id';
  const users = useSelector((state: AppRootState) => state.admin.users);
  const count = useSelector((state: AppRootState) => state.admin.usersCount);
  const isLoading = useSelector((state: AppRootState) => state.admin.usersIsLoading);
  const errorMessage = useSelector((state: AppRootState) => state.admin.usersErrorMessage);
  const pages = Math.ceil(count / limit) || 1;

  const changeQueryParamHandler = useCallback(
    (
      type: 'limit' | 'filter' | 'search',
      { currentTarget: { value } }: FormEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      let url = '';
      if (type === 'limit') {
        url = `/admin/users?page=${page}&limit=${value}&filter=${filter}&criteria=${criteria}&sorting=${sorting}&search=${search}`;
      } else if (type === 'filter') {
        url = `/admin/users?page=${page}&limit=${limit}&filter=${value}&criteria=${criteria}&sorting=${sorting}&search=${search}`;
      } else if (type === 'search') {
        url = `/admin/users?page=${page}&limit=${limit}&filter=${filter}&criteria=${criteria}&sorting=${sorting}&search=${value}`;
      }
      history.push(url);
    },
    [history, page, limit, filter, criteria, sorting, search]
  );

  const sortByCriteria = useCallback(
    (sortCriteria: string) => {
      const sort = sorting === 'asc' ? 'desc' : 'asc';
      history.push(
        `/admin/users?page=${page}&limit=${limit}&filter=${filter}&criteria=${sortCriteria}&sorting=${sort}&search=${search}`
      );
    },
    [history, page, limit, filter, sorting, search]
  );

  useEffect(() => {
    dispatch(getUsersAction(`admin/users?page=${page}&limit=${limit}`));
  }, [dispatch, page, limit]);

  useEffect(() => {
    dispatch(sortUsers({ criteria, sorting }));
  }, [dispatch, criteria, sorting]);

  useEffect(() => {
    let timer = setTimeout(() => {
      filter && dispatch(getUsersAction(`admin/users?search=${search}&filter=${filter}`));
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
      <Card classes={styles['users-container']}>
        <Table
          headers={headers}
          content={users}
          onSort={sortByCriteria}
          sorting={sorting}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <Pagination
          classes={styles.paginator}
          path='/admin/users'
          currentPage={page}
          pages={pages}
          limit={limit}
        />
      </Card>
    </section>
  );
};

export default UsersList;
