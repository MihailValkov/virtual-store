import { FC } from 'react';

import styles from './LoadingSpinner.module.css';

const LoadingSpinner: FC<{ className?: string }> = ({ className }) => {
  return <div className={`${styles.spinner} ${className}`} />;
};

export default LoadingSpinner;
