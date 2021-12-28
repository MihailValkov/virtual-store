import { FC } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const Backdrop: FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay: FC<{ classes?: string }> = ({ children, classes }) => {
  return <div className={`${styles.modal} ${classes}`}>{children}</div>;
};

const portalElement = document.getElementById('overlays') as HTMLDivElement;

const Modal: FC<{ onClose: () => void; classes?: string }> = ({ onClose, children, classes }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay classes={classes}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
