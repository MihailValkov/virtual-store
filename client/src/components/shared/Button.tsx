import { FC } from 'react';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Button.module.css';

const Button: FC<{
  type?: 'button' | 'submit' | 'reset';
  classes?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: IconDefinition | null;
  iconPosition?: 'before' | 'after';
  title?: string;
}> = ({ type, classes, children, disabled, onClick, icon, title, iconPosition = 'before' }) => {
  return (
    <button
      type={type || 'button'}
      className={`${styles.btn} ${classes}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {iconPosition === 'before' && icon && (
        <FontAwesomeIcon icon={icon} className={styles.before} />
      )}
      {children}
      {iconPosition === 'after' && icon && <FontAwesomeIcon icon={icon} className={styles.after} />}
    </button>
  );
};

export default Button;
