import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  faCity,
  faClock,
  faEdit,
  faEnvelope,
  faHeart,
  faListUl,
  faPhoneAlt,
  faStar,
  faStreetView,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { IUser } from '../../interfaces/user';
import { AppRootState } from '../../+store/store';
import { updateUserAvatarAction } from '../../+store/auth/auth-actions';

import AsideMenu from '../shared/AsideMenu/AsideMenu';
import Card from '../shared/Card';
import BoxCard from './BoxCard';
import ImageUpload from '../shared/Form/ImageUpload';
import EditProfile from './EditProfile';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import AddNewAddress from './AddNewAddress';
import DeliveryAddressList from './DeliveryAddressList';
import LoadingSpinner from '../shared/LoadingSpinner';

import noAvatarImage from '../../assets/no-avatar.png';
import styles from './Profile.module.css';

const Profile: FC<{ user: IUser }> = ({ user }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: AppRootState) => state.auth.isLoading);
  const favoriteProducts = useSelector((state: AppRootState) => state.favorites.products);
  const [isEditProfileMode, setIsEditProfileMode] = useState(false);
  const [isAddNewAddressMode, setIsAddNewAddressMode] = useState(false);

  const onImageUploadHandler = (files: FileList) => {
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('image', files[0]);
    dispatch(updateUserAvatarAction(formData));
  };

  const onEditProfileHandler = () => setIsEditProfileMode((prev) => !prev);
  const onAddNewAddressHandler = () => setIsAddNewAddressMode((prev) => !prev);
  return (
    <>
      {isEditProfileMode && (
        <Modal onClose={onEditProfileHandler} classes={styles['edit-modal']}>
          <EditProfile
            onClose={onEditProfileHandler}
            username={user.username}
            phone={user.phone}
            country={user.address.country}
            city={user.address.city}
            street={user.address.street}
            streetNumber={user.address.streetNumber}
          />
        </Modal>
      )}
      {isAddNewAddressMode && (
        <Modal onClose={onAddNewAddressHandler} classes={styles['address-modal']}>
          <AddNewAddress onClose={onAddNewAddressHandler} />{' '}
        </Modal>
      )}
      <section className={styles['profile']}>
        <AsideMenu />
        <Card classes={styles['profile-container']}>
          <h1>User Profile</h1>
          <div className={styles['profile-information']}>
            <div className={styles['profile-picture']}>
              {isLoading && <LoadingSpinner className={styles.loading} />}
              <img src={user?.image.url || noAvatarImage} alt='profile-img' />
              <ImageUpload
                text='+ Add new Image'
                onUploadFiles={onImageUploadHandler}
                classes={styles.btn}
              />
            </div>
            <div className={styles['profile-info']}>
              <BoxCard icon={faUser} title={user.username} classes='blue' />
              <BoxCard icon={faEnvelope} title={user.email} classes='blue' />
              <BoxCard icon={faPhoneAlt} title={user.phone} classes='blue' />
              <BoxCard
                icon={faCity}
                title={`${user.address.country}, ${user.address.city}`}
                classes='blue'
              />
              <BoxCard
                icon={faStreetView}
                title={`${user.address.street}, ${user.address.streetNumber}`}
                classes='blue'
              />
              <BoxCard
                icon={faClock}
                title={new Date(user.createdAt).toLocaleString()}
                classes='blue'
              />
            </div>
            <div className={styles['profile-actions']}>
              <Button
                icon={faEdit}
                classes={`${styles['edit-btn']} ${styles.btn}`}
                onClick={onEditProfileHandler}
              >
                Edit
              </Button>
            </div>
          </div>

          <h3>User Activity</h3>
          <div className={styles['profile-activity']}>
            <BoxCard
              icon={faListUl}
              title={user?.orders?.length || 0}
              text='Orders'
              classes='green'
            />
            <BoxCard
              icon={faHeart}
              title={favoriteProducts?.length || 0}
              text='Favorites'
              classes='red'
            />
            <BoxCard
              icon={faStar}
              title={user?.comments?.length || 0}
              text='Rates'
              classes='orange'
            />
          </div>

          <h3>Delivery Address</h3>
          <DeliveryAddressList addressList={user.deliveryAddresses} />
          <Button classes={styles.btn} onClick={onAddNewAddressHandler}>
            + Add new Address
          </Button>
        </Card>
      </section>
    </>
  );
};

export default Profile;
