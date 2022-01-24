import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { getUsersAction } from '../../../+store/admin/admin-actions';
import { AppRootState } from '../../../+store/store';
import { useQuery } from '../../../hooks/useQuery';
import Card from '../../shared/Card';
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
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const [sorting, setSorting] = useState('asc');
  const [search, setSearch] = useState('');
  const limit = Number(query.get('limit') || 2);
  const filter = query.get('filter') || '_id';
  const page = Number(query.get('page') || 1);
  const users = useSelector((state: AppRootState) => state.admin.users);
  const count = useSelector((state: AppRootState) => state.admin.usersCount);
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
      // dispatch(sortOrders({ criteria, sorting: sorting === 'asc' ? 'desc' : 'asc' }));
    },
    [dispatch, sorting]
  );

  useEffect(() => {
    dispatch(getUsersAction(`${path.slice(1)}?page=${page}&limit=${limit}`));
  }, [dispatch, path, page, limit]);

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(
        getUsersAction(
          `${path.slice(1)}?page=${page}&limit=${limit}&search=${search}&filter=${filter}`
        )
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, path, page, limit, search, filter]);

  return (
    <section>
      {/* <SearchBar
        onChangeLimit={changeLimitHandler}
        limitValue={limit}
        onChangeFilter={changeFilterHandler}
        filterValue={filter}
        onChangeInputValue={changeSearchValueHandler}
        inputValue={search}
      /> */}
      <Card classes={styles['users-container']}>
        {/* <Table headers={headers} content={users} onSort={sortByCriteria} sorting={sorting} /> */}
        {/* <Pagination classes={styles.paginator} currentPage={page} pages={pages} limit={limit} /> */}
      </Card>
    </section>
  );
};

export default UsersList;
