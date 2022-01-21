import { FC } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

import styles from './Pagination.module.css';

const Pagination: FC<{
  classes?: string;
  currentPage: number;
  pages: number;
  limit: number;
}> = ({ classes, currentPage, pages, limit }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const navigate = (destination: 'next' | 'previous') => {
    if (destination === 'next') {
      history.push(
        `${path}?page=${currentPage + 1 >= pages ? pages : currentPage + 1}&limit=${limit}`
      );
    } else if (destination === 'previous') {
      history.push(`${path}?page=${currentPage - 1 < 1 ? 1 : currentPage - 1}&limit=${limit}`);
    }
  };
  return (
    <div className={`${styles.pagination} ${classes}`}>
      <Button
        icon={faArrowAltCircleLeft}
        onClick={navigate.bind(null, 'previous')}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <p className={styles.pages}>
        Page {currentPage} of {pages} pages.
      </p>
      <Button
        onClick={navigate.bind(null, 'next')}
        disabled={currentPage >= pages}
        icon={faArrowAltCircleRight}
        iconPosition='after'
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
