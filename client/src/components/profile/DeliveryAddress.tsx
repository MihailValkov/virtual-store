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
  onChangeAddress: () => void;
}> = ({ id, country, city, street, streetNumber, checked, onChangeAddress }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const onShowEditModalHandler = () => setShowEditModal((prev) => !prev);
  const onShowDeleteModalHandler = () => setShowDeleteModal((prev) => !prev);

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
          />
        </Modal>
      )}
      {showDeleteModal && (
        <Modal onClose={onShowDeleteModalHandler}>
          <Confirm onClose={onShowDeleteModalHandler} />
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
