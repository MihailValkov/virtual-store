import { ChangeEvent, FC } from 'react';
import styles from './Color.module.css';

const Color: FC<{
  color: string;
  name?: string;
  type: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ color, name, type, onChange, checked }) => {
  return (
    <div className={`${styles.color} ${styles[color]}`}>
      <input
        type={type}
        id={color}
        name={name}
        onChange={onChange}
        value={color}
        checked={checked}
        readOnly={checked}
      />
      <label htmlFor={color}>
        <span></span>
      </label>
    </div>
  );
};

export default Color;
