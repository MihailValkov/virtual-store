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
}> = ({ type, classes, children, disabled, onClick, icon }) => {
  return (
    <button
      type={type || 'button'}
      className={`${styles.btn} ${classes}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
};

export default Button;

