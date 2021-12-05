import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './StarRating.module.css';

const StarRating: FC<{ width: number }> = ({ width }) => {
  return (
    <div className={styles.rating}>
      <FontAwesomeIcon icon={faStar} className={styles.icon} />
      <FontAwesomeIcon icon={faStar} className={styles.icon} />
      <FontAwesomeIcon icon={faStar} className={styles.icon} />
      <FontAwesomeIcon icon={faStar} className={styles.icon} />
      <FontAwesomeIcon icon={faStar} className={styles.icon} />
      <p className={styles['rating-inner']} style={{ width: `${width}%` }}>
        <FontAwesomeIcon icon={faStar} className={styles['icon-overlay']} />
        <FontAwesomeIcon icon={faStar} className={styles['icon-overlay']} />
        <FontAwesomeIcon icon={faStar} className={styles['icon-overlay']} />
        <FontAwesomeIcon icon={faStar} className={styles['icon-overlay']} />
        <FontAwesomeIcon icon={faStar} className={styles['icon-overlay']} />
      </p>
    </div>
  );
};

export default StarRating;