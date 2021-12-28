import { FC, memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import styles from './FormGroup.module.css';

const FormGroup: FC<{
  classes?:string;
  label: string;
  name: string;
  errorMessage: string;
  hasError: boolean;
  isValid:boolean;
  icon: IconDefinition;
}> = memo(({ label, name, icon, children, errorMessage, hasError,isValid,classes }) => {
  return (
    <div className={`${styles.group} ${classes}`}>
      <label htmlFor={name}>{label}</label>
      <div
        className={`${styles.control} ${
          hasError ? styles.invalid : isValid ? styles.valid : ''
        }`}
      >
        <span> 
          <FontAwesomeIcon icon={icon} className={styles.icon}/>
        </span>
        {children}
      </div>
      <p className={styles.error}>{hasError && errorMessage}</p>
    </div>
  );
});

export default FormGroup;
