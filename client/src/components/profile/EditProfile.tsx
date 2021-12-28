import { FC, FormEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  faCity,
  faHome,
  faLock,
  faMapMarkedAlt,
  faPhone,
  faStreetView,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import useInput from '../../hooks/use-input';
import {
  cityValidation,
  countryValidation,
  streetNumberValidation,
  streetValidation,
  usernameValidation,
  phoneValidation,
  passwordValidation,
} from '../../util/validations';
import { updateUserInformationAction } from '../../+store/auth/auth-actions';
import { AppRootState } from '../../+store/store';

import Form from '../shared/Form/Form';
import FormActions from '../shared/Form/FormActions';
import FormGroup from '../shared/Form/FormGroup';
import FormRow from '../shared/Form/FormRow';
import Button from '../shared/Button';

import styles from './EditProfile.module.css';

const EditProfile: FC<{
  onClose: () => void;
  username: string;
  phone: string;
  country: string;
  city: string;
  street: string;
  streetNumber: number;
}> = ({ onClose, username, phone, country, city, street, streetNumber }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: AppRootState) => state.auth.errorMessage);
  const isLoading = useSelector((state: AppRootState) => state.auth.isLoading);
  const {
    value: usernameValue,
    isValid: usernameIsValid,
    errorMessage: usernameErrorMessage,
    hasError: usernameHasError,
    blurHandler: usernameBlurHandler,
    changeHandler: usernameChangeHandler,
    resetHandler: usernameReset,
  } = useInput(usernameValidation, username);
  const {
    value: phoneValue,
    isValid: phoneIsValid,
    errorMessage: phoneErrorMessage,
    hasError: phoneHasError,
    blurHandler: phoneBlurHandler,
    changeHandler: phoneChangeHandler,
    resetHandler: phoneReset,
  } = useInput(phoneValidation, phone);
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
  } = useInput(streetNumberValidation, streetNumber.toString());
  const {
    value: oldPasswordValue,
    isValid: oldPasswordIsValid,
    errorMessage: oldPasswordErrorMessage,
    hasError: oldPasswordHasError,
    blurHandler: oldPasswordBlurHandler,
    changeHandler: oldPasswordChangeHandler,
    resetHandler: oldPasswordReset,
  } = useInput(passwordValidation);
  const {
    value: newPasswordValue,
    isValid: newPasswordIsValid,
    errorMessage: newPasswordErrorMessage,
    hasError: newPasswordHasError,
    blurHandler: newPasswordBlurHandler,
    changeHandler: newPasswordChangeHandler,
    resetHandler: newPasswordReset,
  } = useInput(
    useCallback(
      (value: string) =>
        new RegExp(`^${oldPasswordValue}$`).test(value) && value.trim().length > 0
          ? { message: '', isValid: true }
          : {
              message: 'Both passwords should match!',
              isValid: false,
            },
      [oldPasswordValue]
    )
  );

  const [isChangePasswordChecked, setIsChangePasswordChecked] = useState(false);
  const onChangePasswordHandler = ({ currentTarget: { value } }: FormEvent<HTMLSelectElement>) => {
    if (value === 'yes') {
      setIsChangePasswordChecked(true);
    } else {
      setIsChangePasswordChecked(false);
    }
  };

  const formIsValid =
    usernameIsValid &&
    phoneIsValid &&
    countryIsValid &&
    cityIsValid &&
    streetIsValid &&
    streetNumberIsValid &&
    (!isChangePasswordChecked || (oldPasswordIsValid && newPasswordIsValid));

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo = {
      username: usernameValue,
      phone: phoneValue,
      country: countryValue,
      city: cityValue,
      street: streetValue,
      streetNumber: streetNumberValue,
    };
    dispatch(
      updateUserInformationAction(
        isChangePasswordChecked
          ? { ...userInfo, oldPassword: oldPasswordValue, newPassword: newPasswordValue }
          : userInfo,
        onClose
      )
    );
  };

  return (
    <div className={styles['profile-edit']}>
      <h2>Edit User Information</h2>
      <Form isLoading={isLoading} onSubmitHandler={onSubmitHandler}>
        <FormRow>
          <FormGroup
            name='username'
            errorMessage={usernameErrorMessage}
            hasError={usernameHasError}
            isValid={usernameIsValid}
            icon={faUser}
            label='Username'
          >
            <input
              id='username'
              name='country'
              type='text'
              value={usernameValue}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
            />
          </FormGroup>
          <FormGroup
            name='phone'
            errorMessage={phoneErrorMessage}
            hasError={phoneHasError}
            isValid={phoneIsValid}
            icon={faPhone}
            label='Phone Number:'
          >
            <input
              id='phone'
              name='phone'
              type='text'
              value={phoneValue}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
            />
          </FormGroup>
        </FormRow>
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
              type='text'
              value={streetNumberValue}
              onChange={streetNumberChangeHandler}
              onBlur={streetNumberBlurHandler}
            />
          </FormGroup>
        </FormRow>
        {isChangePasswordChecked && (
          <FormRow animation>
            <FormGroup
              name='oldPassword'
              errorMessage={oldPasswordErrorMessage}
              hasError={oldPasswordHasError}
              isValid={oldPasswordIsValid}
              icon={faLock}
              label='Old Password'
            >
              <input
                id='oldPassword'
                name='oldPassword'
                type='password'
                value={oldPasswordValue}
                onChange={oldPasswordChangeHandler}
                onBlur={oldPasswordBlurHandler}
              />
            </FormGroup>
            <FormGroup
              name='newPassword'
              errorMessage={newPasswordErrorMessage}
              hasError={newPasswordHasError}
              isValid={newPasswordIsValid}
              icon={faLock}
              label='New Password'
            >
              <input
                id='newPassword'
                name='newPassword'
                type='password'
                value={newPasswordValue}
                onChange={newPasswordChangeHandler}
                onBlur={newPasswordBlurHandler}
              />
            </FormGroup>
          </FormRow>
        )}
        <FormRow classes={styles['change-password']}>
          <p>Do you want to change the password?</p>
          <select name='changePassword' onChange={onChangePasswordHandler} defaultValue='no'>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>
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

export default EditProfile;
