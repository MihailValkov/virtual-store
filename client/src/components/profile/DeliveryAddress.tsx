import { FC, useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import Confirm from '../shared/Confirm';
import AddNewAddress from './AddNewAddress';
import styles from './DeliveryAddress.module.css';

const DeliveryAddress: FC<{
  id: string;
  country: string;
  city: string;
  street: string;
  streetNumber: number;
  checked: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  onShowEditModal: () => void;
  onShowDeleteModal: () => void;
  onChangeAddress: () => void;
  onDeleteAddress: (onClose: () => void) => void;
}> = ({
  id,
  country,
  city,
  street,
  streetNumber,
  checked,
  showEditModal,
  onShowEditModal,
  showDeleteModal,
  onShowDeleteModal,
  onChangeAddress,
  onDeleteAddress,
}) => {
  return (
    <>
      {showEditModal && (
        <Modal onClose={onShowEditModal}>
          <AddNewAddress
            onClose={onShowEditModal}
            id={id}
            country={country}
            city={city}
            street={street}
            streetNumber={streetNumber}
            defaults={checked}
          />
        </Modal>
      )}
      {showDeleteModal && (
        <Modal onClose={onShowDeleteModal}>
          <Confirm
            onClose={onShowDeleteModal}
            onConfirm={onDeleteAddress.bind(null, onShowDeleteModal)}
          />
        </Modal>
      )}
      <li className={`${styles['address']} ${checked && styles['active']}`}>
        <p className={styles['address-info']}>
          <input
            type='radio'
            name='address'
            id={id}
            onChange={onChangeAddress}
            checked={checked}
            value={id}
          />
          <label htmlFor={id}>
            {country}, {city} , {street} № {streetNumber}
          </label>
        </p>
        <p className={styles['actions']}>
          <Button
            icon={faEdit}
            classes={`${styles['edit-btn']} ${styles.btn}`}
            onClick={onShowEditModal}
          ></Button>
          <Button
            icon={faTrash}
            classes={`${styles['delete-btn']} ${styles.btn}`}
            onClick={onShowDeleteModal}
          ></Button>
        </p>
      </li>
    </>
  );
};

export default DeliveryAddress;
