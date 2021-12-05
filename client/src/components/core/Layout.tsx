import { Fragment, FC } from 'react';
import Footer from './Footer';
import styles from './Layout.module.css';
import Navigation from './Navigation';

const Layout: FC = (props) => {
    return (
        <Fragment>
            <Navigation />
            <main className={styles.main}>{props.children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout;