import { FC, FormEvent, useState } from 'react';
import Form from '../shared/Form/Form';
import FormActions from '../shared/Form/FormActions';
import FormGroup from '../shared/Form/FormGroup';
import FormRow from '../shared/Form/FormRow';
import Button from '../shared/Button';
import {
  faCity,
  faHome,
  faLock,
  faMapMarkedAlt,
  faPhone,
  faStreetView,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
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
  const [isChangePasswordChecked, setIsChangePasswordChecked] = useState(false);
  const onChangePasswordHandler = ({ currentTarget: { value } }: FormEvent<HTMLSelectElement>) => {
    if (value === 'yes') {
      setIsChangePasswordChecked(true);
    } else {
      setIsChangePasswordChecked(false);
    }
  };

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log('Edit user information');
  };

  return (
    <div className={styles['profile-edit']}>
      <h2>Edit User Information</h2>
      <Form isLoading={false} onSubmitHandler={onSubmitHandler}>
        <FormRow>
          <FormGroup
            name='username'
            errorMessage=''
            hasError={false}
            icon={faUser}
            isValid={true}
            label='Username'
          >
            <input id='username' defaultValue={username} />
          </FormGroup>
          <FormGroup
            name='phone'
            errorMessage=''
            hasError={false}
            icon={faPhone}
            isValid={true}
            label='Phone Number'
          >
            <input id='phone' type='text' defaultValue={phone} />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup
            name='country'
            errorMessage=''
            hasError={false}
            icon={faMapMarkedAlt}
            isValid={true}
            label='Country:'
          >
            <input id='country' type='text' defaultValue={country} />
          </FormGroup>
          <FormGroup
            name='city'
            errorMessage=''
            hasError={false}
            icon={faCity}
            isValid={true}
            label='City'
          >
            <input id='city' type='text' defaultValue={city} />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup
            name='street'
            errorMessage=''
            hasError={false}
            icon={faStreetView}
            isValid={true}
            label='Street:'
          >
            <input id='street' type='text' defaultValue={street} />
          </FormGroup>
          <FormGroup
            name='streetNumber'
            errorMessage=''
            hasError={false}
            icon={faHome}
            isValid={true}
            label='№:'
          >
            <input id='streetNumber' type='text' defaultValue={streetNumber} />
          </FormGroup>
        </FormRow>
        {isChangePasswordChecked && (
          <FormRow animation>
            <FormGroup
              name='oldPassword'
              errorMessage=''
              hasError={false}
              icon={faLock}
              isValid={true}
              label='Old Password'
            >
              <input id='oldPassword' type='password' />
            </FormGroup>
            <FormGroup
              name='newPassword'
              errorMessage=''
              hasError={false}
              icon={faLock}
              isValid={true}
              label='New Password'
            >
              <input id='newPassword' type='password' />
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
        <FormActions responseError={''}>
          <Button classes={styles.btn} disabled={false} type='submit'>
            Save
          </Button>
          <Button classes={styles.btn} disabled={false} type='button' onClick={onClose}>
            Cancel
          </Button>
        </FormActions>
      </Form>
    </div>
  );
};

export default EditProfile;
