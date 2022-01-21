import { FC, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { useQuery } from '../../../hooks/useQuery';

import Button from '../../shared/Button';
import styles from './Test.module.css';

const Test: FC<{}> = (props) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const query = useQuery();

  const limit = Number(query.get('limit') || 10);
  const page = Number(query.get('page') || 1);

  const onClickHandler = () => {
    history.push(`${path}?page=${page + 1}&limit=${limit}`);
  };

  useEffect(() => {
    console.log('initial');
  }, []);

  useEffect(() => {
    console.log('change - page or limit');
  }, [limit, limit]);

  return (
    <section>
      <Button onClick={onClickHandler}>Push search param</Button>
    </section>
  );
};

export default Test;
