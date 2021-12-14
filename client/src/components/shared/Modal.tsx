import { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop: FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay: FC = ({ children }) => {
  return <div className={styles.modal}>{children}</div>;
};

const portalElement = document.getElementById('overlays') as HTMLDivElement;

const Modal: FC<{ onClose: () => void }> = ({ onClose, children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
