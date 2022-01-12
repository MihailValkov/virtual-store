import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './AsideLink.module.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const AsideLink: FC<{ path: string; icon: IconDefinition; text: string; isLogged: boolean }> = ({
  path,
  icon,
  text,
  isLogged,
}) => {
  return (
    <NavLink
      to={path}
      activeClassName={styles.active}
      className={isLogged ? styles['user-link'] : styles['guest-link']}
    >
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <span>{text}</span>
    </NavLink>
  );
};

export default AsideLink;
