import { FC, useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addNewAddressAction, changeCurrentAddressAction } from '../../+store/auth/auth-actions';
import { IAddress } from '../../interfaces/user';
import DeliveryAddress from './DeliveryAddress';
import styles from './DeliveryAddressList.module.css';

const DeliveryAddressLists: FC<{
  addressList: IAddress[];
}> = ({ addressList }) => {
  const dispatch = useDispatch();
  const onChangeAddressHandler = (id: string) => {
    dispatch(changeCurrentAddressAction(id));
  };

  return (
    <ul>
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
