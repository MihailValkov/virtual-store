import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import styles from './BoxCard.module.css';

const BoxCard: FC<{
  icon: IconDefinition;
  title: string | number;
  text?: string;
  classes?: string;
}> = ({ icon, title, text, classes }) => {
  return (
    <div className={`${styles['box']} ${styles[classes || 'blue']}`}>
      <span>
        <FontAwesomeIcon icon={icon} />
      </span>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </div>
  );
};

export default BoxCard;
