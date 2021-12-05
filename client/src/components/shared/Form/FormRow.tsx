import { FC } from 'react';
import styles from './FormRow.module.css';

const FormRow: FC<{ classes?: string; animation?: boolean }> = ({
  children,
  classes,
  animation,
}) => {
  return (
    <div className={`${styles['form-row']} ${animation && styles.animation} ${classes}`}>
      {children}
    </div>
  );
};

export default FormRow;
