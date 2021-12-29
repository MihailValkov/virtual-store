import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCartArrowDown,
  faUser,
  faList,
  faSignInAlt,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

import { AppRootState } from '../../../+store/store';
import Card from '../Card';

import noAvatarImage from '../../../assets/no-avatar.png';
import styles from './AsideMenu.module.css';
import { Backdrop } from '../Modal';
import Button from '../Button';

const AsideMenu: FC<{}> = () => {
  const user = useSelector((state: AppRootState) => state.auth.user);
  const isLogged = !!user;
  const [isToggle, setIsToggle] = useState(true);

  const toggleHandler = () => setIsToggle((prev) => !prev);

  const guestContent = (
    <>
      <div className={styles['user-info']}>
        <img src={noAvatarImage} alt='profile-img' />
        <h3 className={styles['anonymous-title']}>You are anonymous user currently.</h3>
        <p>Login or register so you can access extra functionality.</p>
      </div>
      <ul className={styles.navigation}>
        <li className={styles['guest']}>
          <NavLink to='/auth/login'>
            <FontAwesomeIcon
              icon={faSignInAlt}
              className={`${styles.icon} ${styles['nav-icon']}`}
            />
            <span>Login</span>
          </NavLink>
        </li>
        <li className={styles['guest']}>
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
      <Button
        onClick={toggleHandler}
        icon={!isToggle ? faArrowAltCircleLeft : faArrowAltCircleRight}
        classes={styles['aside-btn']}
      />
      <section className={styles['aside-content']}>
        <div className={styles['user-info']}>
          <img src={user?.image?.url || noAvatarImage} alt='profile-img' />
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
      </section>
    </>
  );
  return (
    <>
      {!isToggle && <Backdrop onClose={toggleHandler} />}
      <Card classes={`${styles['user']} ${isToggle && styles['toggle']}`}>
        {isLogged ? userContent : guestContent}
      </Card>
    </>
  );
};

export default AsideMenu;
