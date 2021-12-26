import { FC, useState, useEffect, ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCurrentAddressAction,
  deleteDeliveryAddressAction,
} from '../../+store/auth/auth-actions';
import { AppRootState } from '../../+store/store';
import { IAddress } from '../../interfaces/user';
import LoadingSpinner from '../shared/LoadingSpinner';
import DeliveryAddress from './DeliveryAddress';
import styles from './DeliveryAddressList.module.css';

const DeliveryAddressLists: FC<{
  addressList: IAddress[];
}> = ({ addressList }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: AppRootState) => state.auth.isLoading);

  const onChangeAddressHandler = useCallback(
    (id: string) => {
      dispatch(changeCurrentAddressAction(id));
    },
    [dispatch]
  );
  const onDeleteAddressHandler = useCallback(
    (id: string, onClose: () => void) => {
      dispatch(deleteDeliveryAddressAction(id, onClose));
    },
    [dispatch]
  );

  return (
    <ul className={styles['address-list']}>
      {isLoading && <LoadingSpinner />}
      {addressList.map((a) => (
        <DeliveryAddress
          key={a._id}
          id={a._id}
          country={a.country}
          city={a.city}
          street={a.street}
          streetNumber={a.streetNumber}
          checked={a.default}
          onChangeAddress={onChangeAddressHandler.bind(null, a._id)}
          onDeleteAddress={onDeleteAddressHandler.bind(null, a._id)}
        />
      ))}
    </ul>
  );
};

export default DeliveryAddressLists;
