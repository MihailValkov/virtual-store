import { FC } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './Button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button: FC<{
  type?: 'button' | 'submit' | 'reset';
  classes?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: IconDefinition;
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
