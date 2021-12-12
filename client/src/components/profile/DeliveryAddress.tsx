import { FC, useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
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
  const [showModal, setShowModal] = useState(false);
  const onShowModalHandler = () => setShowModal((prev) => !prev);
  return (
    <>
      {showModal && (
        <Modal onClose={onShowModalHandler}>
          <AddNewAddress
            onClose={onShowModalHandler}
            id={id}
            country={country}
            city={city}
            street={street}
            streetNumber={streetNumber}
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
            onClick={onShowModalHandler}
          ></Button>
          <Button icon={faTrash} classes={`${styles['delete-btn']} ${styles.btn}`}></Button>
        </p>
      </li>
    </>
  );
};

export default DeliveryAddress;
