import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { withHighlighted } from '../../hocs/isHighlighted';
import styles from './NavigationLink.module.css';

const NavigationLink: FC<{
  path: string;
  icon: IconDefinition;
  text: string;
  badge?: boolean;
  count?: number;
  isHighlighted: boolean;
}> = ({ path, icon, text, badge, count, isHighlighted }) => {
  let classes = `${styles['icon-container']} ${isHighlighted && styles.bump}`;

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

export default withHighlighted(NavigationLink);
