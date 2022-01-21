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
  faUserShield,
  faCircle,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faPlus,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';

import { AppRootState } from '../../../+store/store';
import Card from '../Card';

import noAvatarImage from '../../../assets/no-avatar.png';
import styles from './AsideMenu.module.css';
import { Backdrop } from '../Modal';
import Button from '../Button';
import AsideLink from './AsideLink';

const AsideMenu: FC<{}> = () => {
  const user = useSelector((state: AppRootState) => state.auth.user);
  const isLogged = !!user;
  const [isToggle, setIsToggle] = useState(true);
  const [profileIsToggle, setProfileIsToggle] = useState(false);
  const [adminIsToggle, setAdminIsToggle] = useState(false);

  const toggleHandler = () => setIsToggle((prev) => !prev);
  const profileToggleHandler = () => setProfileIsToggle((prev) => !prev);
  const adminToggleHandler = () => setAdminIsToggle((prev) => !prev);

  const guestContent = (
    <>
      <Button
        onClick={toggleHandler}
        icon={!isToggle ? faArrowAltCircleLeft : faArrowAltCircleRight}
        classes={styles['aside-btn']}
      />
      <section className={styles['aside-content']}>
        <div className={styles['user-info']}>
          <img src={noAvatarImage} alt='profile-img' />
          <h3 className={styles['anonymous-title']}>You are anonymous user currently.</h3>
          <p>Login or register so you can access extra functionality.</p>
        </div>
        <ul className={styles.navigation}>
          <li className={styles['guest']}>
            <AsideLink path='/auth/login' icon={faSignInAlt} text='Login' isLogged={isLogged} />
          </li>
          <li className={styles['guest']}>
            <AsideLink path='/auth/register' icon={faUser} text='Register' isLogged={isLogged} />
          </li>
        </ul>
      </section>
    </>
  );

  const adminNavigation = (
    <ul className={`${styles['nav-list']} ${adminIsToggle && styles['nav-toggle']}`}>
      <li>
        <AsideLink
          path='/categories/create'
          icon={faPlus}
          text='Add Category'
          isLogged={isLogged}
        />
      </li>
      <li>
        <AsideLink
          path='/categories/products/create'
          icon={faPlus}
          text='Add Product'
          isLogged={isLogged}
        />
      </li>
      <li>
        <AsideLink
          path='/admin/orders?page=1&limit=10'
          icon={faList}
          text='Orders'
          isLogged={isLogged}
        />
      </li>
      <li>
        <AsideLink
          path='/admin/users?page=1&limit=10'
          icon={faUserFriends}
          text='Users'
          isLogged={isLogged}
        />
      </li>
    </ul>
  );

  const userNavigation = (
    <ul className={`${styles['nav-list']} ${profileIsToggle && styles['nav-toggle']}`}>
      <li>
        <AsideLink path='/auth/profile' icon={faUser} text='My Profile' isLogged={isLogged} />
      </li>
      <li>
        <AsideLink path='/cart' icon={faCartArrowDown} text='My Cart' isLogged={isLogged} />
      </li>
      <li>
        <AsideLink path='/favorites' icon={faHeart} text='My Favorites' isLogged={isLogged} />
      </li>
      <li>
        <AsideLink path='/orders' icon={faList} text='My Orders' isLogged={isLogged} />
      </li>
    </ul>
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
          <div>
            <strong className={styles['user-username']}>{user?.username}</strong>
            <p className={styles['user-role']}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={user?.role === 'Admin' ? faUserShield : faUser}
              />
              <span>{user?.role}</span>
            </p>
            <p className={styles['user-status']}>
              <FontAwesomeIcon className={styles.icon} icon={faCircle} />
              <span>Online</span>
            </p>
          </div>
        </div>
        <ul className={styles.navigation}>
          <li>
            <Button
              icon={profileIsToggle ? faArrowAltCircleUp : faArrowAltCircleDown}
              onClick={profileToggleHandler}
              classes={styles['nav-btn']}
            >
              Profile{' '}
            </Button>
            {userNavigation}
          </li>
          {user?.role === 'Admin' && (
            <li>
              <Button
                icon={adminIsToggle ? faArrowAltCircleUp : faArrowAltCircleDown}
                onClick={adminToggleHandler}
                classes={styles['nav-btn']}
              >
                Administration{' '}
              </Button>
              {adminNavigation}
            </li>
          )}
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
