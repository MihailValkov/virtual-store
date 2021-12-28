import { FC, FormEventHandler } from 'react';

import LoadingSpinner from '../LoadingSpinner';

import styles from './Form.module.css';

const Form: FC<{
  onSubmitHandler: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}> = ({ children, onSubmitHandler, isLoading }) => {
  return (
    <>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        {isLoading && <LoadingSpinner className={styles.overlay} />}
        {children}
      </form>
    </>
  );
};

export default Form;
