import { FC } from 'react';

import Footer from './Footer';
import Navigation from './Navigation';

import styles from './Layout.module.css';

const Layout: FC = (props) => {
  return (
    <>
      <Navigation />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
