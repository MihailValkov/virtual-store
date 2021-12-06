import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './NavigationLink.module.css';

const NavigationLink: FC<{
  path: string;
  icon: IconDefinition;
  text: string;
  badge?: boolean;
  count?: number;
}> = ({ path, icon, text, badge, count }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  let classes = `${styles['icon-container']} ${isHighlighted && styles.bump}`;

  useEffect(() => {
    if (count === 0) {
      return;
    }
    setIsHighlighted(true);
    let timer = setTimeout(() => setIsHighlighted(false), 300);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <NavLink className={styles.link} to={path} activeClassName={styles.active}>
      <div className={classes}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        {badge && <span className={styles.badge}>{count}</span>}
      </div>
      {text && <span>{text}</span>}
    </NavLink>
  );
};

export default NavigationLink;
