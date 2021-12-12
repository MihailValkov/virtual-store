import { FC, useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddressAction, changeCurrentAddressAction } from '../../+store/auth/auth-actions';
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

  const onChangeAddressHandler = (id: string) => {
    dispatch(changeCurrentAddressAction(id));
  };

  return (
    <ul className={styles['address-list']}>
      {isLoading && <LoadingSpinner/>}
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
        />
      ))}
    </ul>
  );
};

export default DeliveryAddressLists;
