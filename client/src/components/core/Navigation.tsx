import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { logoutAction } from '../../+store/auth/auth-actions';
import { AppRootState } from '../../+store/store';

import {
  faHeart,
  faCartArrowDown,
  faUser,
  faSignInAlt,
  faUserPlus,
  faStore,
  faUserShield,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavigationLink from '../shared/NavigationLink';
import Button from '../shared/Button';

import styles from './Navigation.module.css';

const Navigation: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: AppRootState) => state.auth.user);
  const totalCartProducts = useSelector((state: AppRootState) => state.cart.totalProducts);
  const totalFavoriteProducts = useSelector(
    (state: AppRootState) => state.favorites.products
  ).length;

  const logoutHandler = () => {
    dispatch(logoutAction());
    history.replace('/');
  };

  return (
    <header className={styles.header}>
      <NavLink to='/categories' exact className={styles.logo}>
        <FontAwesomeIcon icon={faStore} />
        <span className={styles.text}>Virtual Store</span>
      </NavLink>
      <nav className={styles.actions}>
        {user && (
          <NavigationLink
            icon={user?.role === 'Admin' ? faUserShield : faUser}
            path='/auth/profile'
            text='Profile'
          />
        )}
        <NavigationLink
          icon={faHeart}
          path='/favorites'
          text='Your Favorites'
          badge
          count={totalFavoriteProducts}
        />
        <NavigationLink
          icon={faCartArrowDown}
          path='/cart'
          text='Your Cart'
          badge
          count={totalCartProducts}
        />
        {!user && <NavigationLink icon={faSignInAlt} path='/auth/login' text='Login' />}
        {!user && <NavigationLink icon={faUserPlus} path='/auth/register' text='Register' />}
        {user && (
          <Button onClick={logoutHandler} icon={faPowerOff}>
            <span className={styles.text}>Logout</span>
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
