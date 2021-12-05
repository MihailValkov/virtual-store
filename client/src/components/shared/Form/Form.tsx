import { FC, FormEventHandler } from 'react';
import LoadingSpinner from '../layout/LoadingSpinner';
import styles from './Form.module.css';

const Form: FC<{
  onSubmitHandler: FormEventHandler<HTMLFormElement>; isLoading:boolean
}> = ({ children, onSubmitHandler,isLoading }) => {
  return (
    <form onSubmit={onSubmitHandler} className={styles.form}>
      {children}
      {isLoading && <LoadingSpinner className={styles.overlay} />}
    </form>
  );
};

export default Form;
