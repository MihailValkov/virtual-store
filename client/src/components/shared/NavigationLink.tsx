import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './NavigationLink.module.css';

const NavigationLink: FC<{ path: string; icon: IconDefinition; text: string; badge?: boolean }> = ({
  path,
  icon,
  text,
  badge,
}) => {
  return (
    <NavLink className={styles.link} to={path} activeClassName={styles.active}>
      <div className={styles['icon-container']}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        {badge && <span className={styles.badge}>0</span>}
      </div>
      {text && <span>{text}</span>}
    </NavLink>
  );
};

export default NavigationLink;
