import { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCartArrowDown,
  faUser,
  faList,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

import { AppRootState } from '../../../+store/store';
import Card from '../Card';

import styles from './AsideMenu.module.css';

const AsideMenu: FC<{}> = () => {
  const user = useSelector((state: AppRootState) => state.auth.user);
  const isLogged = !!user;

  const guestContent = (
    <>
      <div className={styles['user-info']}>
        <img src='https://res.cloudinary.com/dofijitd8/image/upload/v1628952324/shared-trips/images/s4iu2zctmmxmek3yi34r.jpg' alt='profile-img' />
        <h3 className={styles['anonymous-title']}>You are anonymous user currently.</h3>
        <p>Login or register so you can access extra functionality.</p>
      </div>
      <ul className={styles.navigation}>
        <li className={styles['guest-login']}>
          <NavLink to='/auth/login'>
            <FontAwesomeIcon
              icon={faSignInAlt}
              className={`${styles.icon} ${styles['nav-icon']}`}
            />
            <span>Login</span>
          </NavLink>
        </li>
        <li className={styles['guest-register']}>
          <NavLink to='/auth/register'>
            <FontAwesomeIcon icon={faUser} className={`${styles.icon} ${styles['nav-icon']}`} />
            <span>Register</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
  const userContent = (
    <>
      <div className={styles['user-info']}>
        <img
          src={user?.imageUrl}
          alt='profile-img'
        />
        <p>{user?.username}</p>
      </div>
      <ul className={styles.navigation}>
        <li>
          <NavLink to='/auth/profile' activeClassName={styles.active}>
            <FontAwesomeIcon icon={faUser} className={`${styles.icon} ${styles['nav-icon']}`} />
            <span>My Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/cart' activeClassName={styles.active}>
            <FontAwesomeIcon
              icon={faCartArrowDown}
              className={`${styles.icon} ${styles['nav-icon']}`}
            />
            <span>My Cart</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/favorites' activeClassName={styles.active}>
            <FontAwesomeIcon icon={faHeart} className={`${styles.icon} ${styles['nav-icon']}`} />
            <span>My Favorites</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/orders' activeClassName={styles.active}>
            <FontAwesomeIcon icon={faList} className={`${styles.icon} ${styles['nav-icon']}`} />
            <span>My Orders</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
  return <Card classes={styles['user']}>{isLogged ? userContent : guestContent}</Card>;
};

export default AsideMenu;
