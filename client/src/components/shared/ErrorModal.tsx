import { FC, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Modal from './Modal';
import Button from './Button';

import styles from './ErrorModal.module.css';

const ErrorModal: FC<{ header: string; errorMessage: string | null; onCloseModal: () => void }> = ({
  header,
  errorMessage,
  onCloseModal,
}) => {
  return (
    <Modal onClose={onCloseModal}>
      <div className={styles.header}>
        <h2>{header}</h2>
        <Button classes={styles.button} icon={faTimes} onClick={onCloseModal} />
      </div>
      <div className={styles.content}>
        <FontAwesomeIcon icon={faExclamationTriangle} className={styles.icon} />
        <h3>{errorMessage}</h3>
      </div>
    </Modal>
  );
};

export default ErrorModal;
