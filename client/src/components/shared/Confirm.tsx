import { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../+store/store';

import Button from '../shared/Button';
import LoadingSpinner from './LoadingSpinner';

import styles from './Confirm.module.css';

const Confirm: FC<{
  onClose: () => void;
  onConfirm: () => void;
}> = ({ onClose, onConfirm }) => {
  const isLoading = useSelector((state: AppRootState) => state.auth.isLoading);
  return (
    <div className={styles['confirm-container']}>
      {isLoading && <LoadingSpinner className={styles.loader}/>}
      <h2>Are you sure ?</h2>
      <div className={styles.actions}>
        <Button classes={styles.btn} type='button' onClick={onConfirm}>
          Continue
        </Button>
        <Button classes={styles.btn} type='button' onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
