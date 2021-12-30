import { FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createOrdersAction } from '../../../+store/orders/orders-actions';
import { AppRootState } from '../../../+store/store';

import {
  faCartArrowDown,
  faCreditCard,
  faEnvelope,
  faHome,
  faInfo,
  faMoneyBill,
  faPhoneAlt,
  faSortDown,
  faStreetView,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CheckoutComplete from './CheckoutComplete';
import AddNewAddress from '../../profile/AddNewAddress';
import BoxCard from '../../profile/BoxCard';
import DeliveryAddressList from '../../profile/DeliveryAddressList';
import Button from '../../shared/Button';
import Card from '../../shared/Card';
import Modal from '../../shared/Modal';
import Location from '../../shared/Location';
import noAvatarImage from '../../../assets/no-avatar.png';

import styles from './Checkout.module.css';

const locations: { icon: IconDefinition; text: string; to: string }[] = [
  {
    icon: faHome,
    text: 'Home',
    to: '/',
  },
  {
    icon: faCartArrowDown,
    text: 'Cart',
    to: '/cart',
  },
  {
    icon: faCreditCard,
    text: 'Checkout',
    to: '/cart/checkout',
  },
];
const Checkout: FC<{}> = () => {
  const selectedMethodRef = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: AppRootState) => state.auth.user);
  const [addNewAddressMode, setIsAddNewAddressMode] = useState(false);
  const [completeOrder, setCompleteOrder] = useState(false);
  const products = useSelector((state: AppRootState) => state.cart.products);
  const totalPrice = useSelector((state: AppRootState) => state.cart.totalPrice);
  const totalProducts = useSelector((state: AppRootState) => state.cart.totalProducts);

  const isLoading = useSelector((state: AppRootState) => state.orders.isLoading);
  const errorMessage = useSelector((state: AppRootState) => state.orders.errorMessage);
  const orderId = useSelector((state: AppRootState) => state.orders.lastOrderId);

  const taxes = products?.length * products[0]?.taxes || 0;
  const currentAddress = user?.deliveryAddresses.find((a) => a.default === true);

  const onAddNewAddressHandler = () => setIsAddNewAddressMode((prev) => !prev);

  const submitHandler = () => {
    setCompleteOrder(true);
    dispatch(
      createOrdersAction({
        userId: user?._id || '',
        deliveryAddress: `${currentAddress?.country}, ${currentAddress?.city}, ${currentAddress?.street}  № ${currentAddress?.streetNumber}`,
        totalPrice,
        taxes,
        paymentMethod: selectedMethodRef.current!.value,
        products: products.map((p) => ({
          _id: p._id,
          quantity: p.quantity,
          selectedColor: p.selectedColor,
          finalPrice: p.finalPrice,
        })),
      })
    );
  };

  return (
    <>
      <Location locations={locations} />{' '}
      {addNewAddressMode && (
        <Modal onClose={onAddNewAddressHandler} classes={styles['address-modal']}>
          <AddNewAddress onClose={onAddNewAddressHandler} />{' '}
        </Modal>
      )}
      {completeOrder && (
        <Modal onClose={() => {}} >
          <CheckoutComplete isLoading={isLoading} errorMessage={errorMessage} orderId={orderId} />
        </Modal>
      )}
      <section className={styles.checkout}>
        <Card classes={styles.content}>
          <h3>
            <FontAwesomeIcon icon={faUser} /> User Information:
          </h3>
          <div className={styles['profile-information']}>
            <div className={styles['profile-picture']}>
              <img src={user?.image.url || noAvatarImage} alt='profile-img' />
            </div>
            <div className={styles['profile-info']}>
              <BoxCard icon={faUser} title={user!.username} classes='blue' />
              <BoxCard icon={faEnvelope} title={user!.email} classes='blue' />
              <BoxCard icon={faPhoneAlt} title={user!.phone} classes='blue' />
            </div>
          </div>
          <div className={styles['delivery-address']}>
            <h3>
              <FontAwesomeIcon icon={faStreetView} /> Choose an address for delivery:
            </h3>
            <DeliveryAddressList addressList={user!.deliveryAddresses} />
            <Button classes={styles.btn} onClick={onAddNewAddressHandler}>
              + Add new Address
            </Button>
            <h3>
              <FontAwesomeIcon icon={faMoneyBill} /> Payment method:
            </h3>
            <div className={styles['category-select']}>
              <select ref={selectedMethodRef}>
                <option value='cache'>Cache</option>
              </select>
              <span className={styles['select-icon']}>
                <FontAwesomeIcon icon={faSortDown} />
              </span>
            </div>
          </div>
          <h3>
            <FontAwesomeIcon icon={faInfo} /> Checkout Information:
          </h3>
          <div className={styles['information']}>
            <div className={styles['final-info']}>
              <p>
                <span>Products:</span> <span>{totalProducts}</span>
              </p>
              <p>
                <span>Price:</span>{' '}
                <span>{totalPrice === 0 ? '0.00' : (totalPrice - taxes).toFixed(2)} BGN</span>
              </p>
              <p>
                <span>Taxes:</span> <span>{taxes} BGN</span>
              </p>
            </div>
            <div className={styles['action']}>
              <p>Total Price: </p>
              <strong>{totalPrice.toFixed(2)} BGN</strong>
              <Button classes={styles.btn} onClick={submitHandler} disabled={products.length === 0}>
                Confirm
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Checkout;
