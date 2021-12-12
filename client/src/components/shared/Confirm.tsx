import { FC } from 'react';
import Button from '../shared/Button';
import styles from './Confirm.module.css';

const Confirm: FC<{
  onClose: () => void;
}> = ({onClose}) => {
  return (
    <div className={styles['confirm-container']}>
      <h2>Are you sure ?</h2>
      <div className={styles.actions}>
      <Button classes={styles.btn} type='button'>
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
