import { faArrowDown, faArrowUp, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, memo } from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { IAdminOrder } from '../../interfaces/order';
import { IAdminUser } from '../../interfaces/user';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import styles from './Table.module.css';

interface ITableInterface<T> {
  headers: { [prop: string]: string };
  content: T[] | null;
  onSort: (criteria: string) => void;
  sorting: string;
  isLoading: boolean;
  errorMessage: string | null;
}

const Table: FC<ITableInterface<IAdminOrder | IAdminUser>> = ({
  headers,
  content,
  onSort,
  sorting,
  isLoading,
  errorMessage,
}) => {
  const { path } = useRouteMatch();
  let tableContent = null;

  if (content?.length === 0 && !isLoading) {
    tableContent = (
      <tr>
        <td colSpan={Object.keys(headers).length} className={styles.center}>There is no orders.</td>
      </tr>
    );
  }
  if (isLoading && !errorMessage) {
    tableContent = (
      <tr className={styles.loading}>
        <td>
          <LoadingSpinner />
        </td>
      </tr>
    );
  }
  if (!isLoading && errorMessage) {
    tableContent = (
      <tr>
        <td colSpan={Object.keys(headers).length}>{errorMessage}</td>
      </tr>
    );
  }

  if (content?.length && !isLoading && !errorMessage) {
    tableContent = content.map((o) => (
      <tr key={o._id}>
        {Object.values(o).map((s, i) => (
          <td key={`${s}` + i} className={`${s}`.includes('@') ? styles.email : ''}>
            {s}
          </td>
        ))}
        <td className={styles.actions}>
          <Link to={`${path}/edit/${o._id}`} className={styles['edit-btn']} title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <Button icon={faTrash} classes={styles['delete-btn']} title='Delete' />
        </td>
      </tr>
    ));
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {Object.entries(headers).map(([k, v]) => {
            if (k === 'action') {
              return <th key={k}>{v}</th>;
            } else {
              return (
                <th key={k} onClick={onSort.bind(null, k)}>
                  {v}
                  <FontAwesomeIcon
                    icon={sorting === 'asc' ? faArrowDown : faArrowUp}
                    className={styles.icon}
                  />
                </th>
              );
            }
          })}
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
};

export default memo(Table);
