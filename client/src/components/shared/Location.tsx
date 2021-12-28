import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Location.module.css';

const Location: FC<{ locations: { icon: IconDefinition; text: string; to: string }[] }> = ({
  locations,
}) => {
  return (
    <div className={styles.location}>
      <ul>
        {locations.map((l, i) => (
          <li key={l.text}>
            <NavLink to={l.to} activeClassName={styles.active}>
              {i !== 0 && <span className={styles.before}></span>}
              <FontAwesomeIcon icon={l.icon} className={styles.icon} />
              {l.text}
              {i !== locations.length - 1 && <span className={styles.after}></span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Location;
