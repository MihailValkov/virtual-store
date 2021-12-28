import { FC, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../../hooks/use-input';
import { reviewValidation } from '../../../../util/validations';
import { rateProductAction } from '../../../../+store/products/products-actions';
import { IRate } from '../../../../interfaces/category-product';
import { AppRootState } from '../../../../+store/store';

import { faComment, faStar } from '@fortawesome/free-solid-svg-icons';

import Form from '../../../shared/Form/Form';
import FormActions from '../../../shared/Form/FormActions';
import FormGroup from '../../../shared/Form/FormGroup';
import RateButton from './RateButton';
import Button from '../../../shared/Button';
import RatingDiagram from './RatingDiagram';

import styles from './RateProduct.module.css';

const RateProduct: FC<{
  onClose: () => void;
  rate: IRate[];
  name: string;
  price: number;
  imageUrl: string;
  userId: string | null;
  productId: string;
}> = ({ onClose, name, price, imageUrl, userId, productId, rate }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: AppRootState) => state.products.isLoading);
  const errorMessage = useSelector((state: AppRootState) => state.products.errorMessage);

  const {
    value: reviewValue,
    isValid: reviewIsValid,
    errorMessage: reviewErrorMessage,
    hasError: reviewHasError,
    blurHandler: reviewBlurHandler,
    changeHandler: reviewChangeHandler,
    resetHandler: reviewReset,
  } = useInput(reviewValidation);

  const formIsValid = reviewIsValid;

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rating = Number(event.currentTarget['rating'].value || 0);
    if (formIsValid) {
      dispatch(rateProductAction(reviewValue, rating, userId || '', productId, onClose));
    }
  };

  return (
    <>
      <h2 className={styles.title}>Rate this product</h2>
      <header className={styles.header}>
        <img src={imageUrl} alt='product-pic' />
        <div className={styles.product}>
          <p className={styles['product-name']}>{name}</p>
          <p className={styles['product-price']}>{price} BGN</p>
        </div>
        <RatingDiagram rate={rate} />
      </header>
      <div className={styles.content}>
        <h2>Rating</h2>

        <Form isLoading={isLoading} onSubmitHandler={onSubmitHandler}>
          <div className={styles['rate-buttons']}>
            <RateButton type='radio' id='5' name='rating' icon={faStar} />
            <RateButton type='radio' id='4' name='rating' icon={faStar} />
            <RateButton type='radio' id='3' name='rating' icon={faStar} />
            <RateButton type='radio' id='2' name='rating' icon={faStar} />
            <RateButton type='radio' id='1' name='rating' icon={faStar} />
          </div>
          <FormGroup
            classes={styles.review}
            label='Write a review'
            name='comment'
            icon={faComment}
            errorMessage={reviewErrorMessage}
            hasError={reviewHasError}
            isValid={reviewIsValid}
          >
            <textarea
              value={reviewValue}
              onChange={reviewChangeHandler}
              onBlur={reviewBlurHandler}
            />
          </FormGroup>
          <FormActions responseError={errorMessage || ''}>
            <Button classes={styles.btn} disabled={!formIsValid} type='submit'>
              Save
            </Button>
            <Button classes={styles.btn} type='button' onClick={onClose}>
              Cancel
            </Button>
          </FormActions>
        </Form>
      </div>
    </>
  );
};

export default RateProduct;
