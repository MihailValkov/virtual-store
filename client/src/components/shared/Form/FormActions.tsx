import { FC, memo } from 'react';

import styles from './FormActions.module.css';

const FormActions: FC<{ responseError: string }> = memo(({ children, responseError }) => {
  return (
    <div className={styles.actions}>
      <div className={styles['error-container']}>
        {responseError && <p className={styles.error}>{responseError}</p>}
      </div>
      <div className={styles.buttons}>{children}</div>
    </div>
  );
});

export default FormActions;
