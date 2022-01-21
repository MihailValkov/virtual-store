import { FC } from 'react';
import styles from './Card.module.css';

const Card: FC<{ classes?: string }> = ({ children, classes }) => {
  return <section className={`${styles.card} ${classes}`}>{children}</section>;
};

export default Card;
