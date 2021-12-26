import { FC, useCallback, useState } from 'react';
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
  onChangeAddress: () => void;
  onDeleteAddress: (onClose: () => void) => void;
}> = ({
  id,
  country,
  city,
  street,
  streetNumber,
  checked,
  onChangeAddress,
  onDeleteAddress,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const onShowEditModalHandler = useCallback(() => setShowEditModal((prev) => !prev), []);
  const onShowDeleteModalHandler = useCallback(() => setShowDeleteModal((prev) => !prev), []);
  
  return (
    <>
      {showEditModal && (
        <Modal onClose={onShowEditModalHandler}>
          <AddNewAddress
            onClose={onShowEditModalHandler}
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
        <Modal onClose={onShowDeleteModalHandler}>
          <Confirm
            onClose={onShowDeleteModalHandler}
            onConfirm={onDeleteAddress.bind(null, onShowDeleteModalHandler)}
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
            onClick={onShowEditModalHandler}
          ></Button>
          <Button
            icon={faTrash}
            classes={`${styles['delete-btn']} ${styles.btn}`}
            onClick={onShowDeleteModalHandler}
          ></Button>
        </p>
      </li>
    </>
  );
};

export default DeliveryAddress;
