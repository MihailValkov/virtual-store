import { FC, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../hooks/use-input';
import {
  addNewDeliveryAddressAction,
  editDeliveryAddressAction,
} from '../../+store/auth/auth-actions';
import {
  countryValidation,
  cityValidation,
  streetValidation,
  streetNumberValidation,
} from '../../util/validations';
import { AppRootState } from '../../+store/store';

import { faCity, faHome, faMapMarkedAlt, faStreetView } from '@fortawesome/free-solid-svg-icons';

import Form from '../shared/Form/Form';
import FormRow from '../shared/Form/FormRow';
import FormActions from '../shared/Form/FormActions';
import FormGroup from '../shared/Form/FormGroup';
import Button from '../shared/Button';

import styles from './AddNewAddress.module.css';

const AddNewAddress: FC<{
  id?: string;
  country?: string;
  city?: string;
  street?: string;
  streetNumber?: number;
  defaults?: boolean;
  onClose: () => void;
}> = ({ onClose, id, country, city, street, streetNumber, defaults }) => {
  const {
    value: countryValue,
    isValid: countryIsValid,
    errorMessage: countryErrorMessage,
    hasError: countryHasError,
    blurHandler: countryBlurHandler,
    changeHandler: countryChangeHandler,
    resetHandler: countryReset,
  } = useInput(countryValidation, country);
  const {
    value: cityValue,
    isValid: cityIsValid,
    errorMessage: cityErrorMessage,
    hasError: cityHasError,
    blurHandler: cityBlurHandler,
    changeHandler: cityChangeHandler,
    resetHandler: cityReset,
  } = useInput(cityValidation, city);
  const {
    value: streetValue,
    isValid: streetIsValid,
    errorMessage: streetErrorMessage,
    hasError: streetHasError,
    blurHandler: streetBlurHandler,
    changeHandler: streetChangeHandler,
    resetHandler: streetReset,
  } = useInput(streetValidation, street);
  const {
    value: streetNumberValue,
    isValid: streetNumberIsValid,
    errorMessage: streetNumberErrorMessage,
    hasError: streetNumberHasError,
    blurHandler: streetNumberBlurHandler,
    changeHandler: streetNumberChangeHandler,
    resetHandler: streetNumberReset,
  } = useInput(streetNumberValidation, streetNumber?.toString());
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: AppRootState) => state.auth.errorMessage);
  const isLoading = useSelector((state: AppRootState) => state.auth.isLoading);
  const formIsValid = countryIsValid && cityIsValid && streetIsValid && streetNumberIsValid;

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
      dispatch(
        editDeliveryAddressAction(
          {
            _id: id,
            country: countryValue,
            city: cityValue,
            street: streetValue,
            streetNumber: Number(streetNumberValue),
            default: defaults || false,
          },
          onClose
        )
      );
    } else {
      dispatch(
        addNewDeliveryAddressAction(
          {
            country: countryValue,
            city: cityValue,
            street: streetValue,
            streetNumber: Number(streetNumberValue),
          },
          onClose
        )
      );
    }
  };

  return (
    <div className={styles['delivery-address']}>
      <h2>Add Address for Delivery</h2>
      <Form isLoading={isLoading} onSubmitHandler={onSubmitHandler}>
        <FormRow>
          <FormGroup
            name='country'
            errorMessage={countryErrorMessage}
            hasError={countryHasError}
            isValid={countryIsValid}
            icon={faMapMarkedAlt}
            label='Country:'
          >
            <input
              id='country'
              name='country'
              type='text'
              value={countryValue}
              onChange={countryChangeHandler}
              onBlur={countryBlurHandler}
            />
          </FormGroup>
          <FormGroup
            name='city'
            errorMessage={cityErrorMessage}
            hasError={cityHasError}
            isValid={cityIsValid}
            icon={faCity}
            label='City:'
          >
            <input
              id='city'
              name='city'
              type='text'
              value={cityValue}
              onChange={cityChangeHandler}
              onBlur={cityBlurHandler}
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup
            name='street'
            errorMessage={streetErrorMessage}
            hasError={streetHasError}
            isValid={streetIsValid}
            icon={faStreetView}
            label='Street:'
          >
            <input
              id='street'
              name='street'
              type='text'
              value={streetValue}
              onChange={streetChangeHandler}
              onBlur={streetBlurHandler}
            />
          </FormGroup>
          <FormGroup
            name='streetNumber'
            errorMessage={streetNumberErrorMessage}
            hasError={streetNumberHasError}
            isValid={streetNumberIsValid}
            icon={faHome}
            label='№:'
          >
            <input
              id='streetNumber'
              name='streetNumber'
              type='number'
              min='1'
              value={streetNumberValue}
              onChange={streetNumberChangeHandler}
              onBlur={streetNumberBlurHandler}
            />
          </FormGroup>
        </FormRow>

        <FormActions responseError={errorMessage || ''}>
          <Button classes={styles.btn} disabled={!formIsValid ? true : false} type='submit'>
            Save
          </Button>
          <Button classes={styles.btn} type='button' onClick={onClose}>
            Cancel
          </Button>
        </FormActions>
      </Form>
    </div>
  );
};

export default AddNewAddress;
