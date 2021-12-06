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
  faSignOutAlt,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import NavigationLink from '../shared/NavigationLink';
import Button from '../shared/Button';
import styles from './Navigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: AppRootState) => state.auth.user);
  const totalCartProducts = useSelector((state: AppRootState) => state.cart.totalProducts);

  const logoutHandler = () => {
    dispatch(logoutAction());
    history.replace('/');
  };

  return (
    <header className={styles.header}>
      <NavLink to='/' exact className={styles.logo}>
      <FontAwesomeIcon icon={faStore}/>
      <span className={styles.text}>Virtual Store</span>
      </NavLink>
      <nav className={styles.actions}>
        {user && <NavigationLink icon={faUser} path='/auth/profile' text='Profile' />}
        <NavigationLink icon={faHeart} path='/favorite' text='Your Favorites' badge />
        <NavigationLink icon={faCartArrowDown} path='/cart' text='Your Cart' badge count={totalCartProducts}/>
        {!user && <NavigationLink icon={faSignInAlt} path='/auth/login' text='Login' />}
        {!user && <NavigationLink icon={faUserPlus} path='/auth/register' text='Register' />}
        {user && <Button onClick={logoutHandler} icon={faSignOutAlt}>Logout</Button>}
      </nav>
    </header>
  );
};

export default Navigation;
