import { FC } from 'react';

import { IRate } from '../../../../interfaces/category-product';

import styles from './RatingDiagram.module.css';

const DiagramItem: FC<{ prop: number; value: number }> = ({ prop, value }) => {
  return (
    <li className={styles['product-rate-wrapper']}>
      <p className={styles['product-rate']} style={{ width: `${value.toFixed(2)}%` }}></p>
      <div className={styles['product-rating']}>
        <span>{prop} star</span>
        <span>{value.toFixed(2)} %</span>
      </div>
    </li>
  );
};

const RatingDiagram: FC<{ rate: IRate[] }> = ({ rate }) => {
  return (
    <ul className={styles['product-ratings']}>
      {rate.map((r, i) => (
        <DiagramItem key={Object.keys(r)[0] || i} prop={i + 1} value={Object.values(r)[0] || 0} />
      ))}
    </ul>
  );
};

export default RatingDiagram;
