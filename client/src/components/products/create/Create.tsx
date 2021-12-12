import { FC, FormEvent, useState } from 'react';
import Card from '../../shared/Card';
import Form from '../../shared/Form/Form';
import FormGroup from '../../shared/Form/FormGroup';
import FormActions from '../../shared/Form/FormActions';
import Button from '../../shared/Button';
import ImageUpload from '../../shared/Form/ImageUpload';
import { emailValidation } from '../../../util/validations';
import useInput from '../../../hooks/use-input';
import {
  faCalendar,
  faComment,
  faCopyright,
  faCubes,
  faHandHolding,
  faSignature,
  faSortDown,
  faStamp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Create.module.css';

import noImage from '../../../assets/no-image.png';
import Colors from '../../shared/Colors';
import PreviewImages from '../../shared/PreviewImages';
import { ICategory } from '../../../interfaces/category';

// 'https://lh3.googleusercontent.com/proxy/0nkn0ZQISXD51opO74gFtKFvE4r-IDqrup4f4CGlDNE0Joel44sD1wIaq4HvYwbKuzXb4lGTkmtu-cHNaH1oSrMvpw0UFDqiFa28Zu0x9dlG9h9Wn6CaNg1GsxuF8bULZC6d-UG3JoUnZGdQn_FfgXB9LRapUShhX0vMTrKOc3BoudtbCRbnCwFqHaJSleU538Td2XR-INxOmLKmE-mUOSc6y6qqTYF2KMtPWIFh_63zbxjQ6uLIcG6WJjPsMPBhfoPfJpwklzmyL42izwzC4ZPwYEE08FcVllWOMZgdK36OBVzqfo1VigMn5COFMUuvyYnxIq-ZuNhp-e1KHZc7Hip_s3kubonsisQzLF9BpJQ89WHVLHB8Q1XfP3tusAnZF_qYQ1kQ6AUGdcrtnrfSPJyaRAHD3PaPk3eFuy0MPkRJwhNYgYfKUccT531M9k0C_9UMp5x3pXpHr4xrFJI9JYb1NZ-z9KXSjRd6GFCdnEdMvLt2wTbGgd1KLR-S0kb086Tz1VkmeAyJSJkR-EDIkf9WMhogjzmrPf-_yphNJ8RrwWz9iizoJMZUDkzhiAsIA0DsGFc';
// const images = [
//   'https://s13emagst.akamaized.net/products/32170/32169398/images/res_a0ae106d44c5ef737055bf8ea9146941.jpg',
//   'https://s13emagst.akamaized.net/products/32170/32169398/images/res_624f129e976b8be5b997ec63be975bbc.jpg',
//   'https://s13emagst.akamaized.net/products/32170/32169398/images/res_c4117c439b862b7517cc87d2c57ac78c.jpg',
//   'https://s13emagst.akamaized.net/products/32170/32169398/images/res_da22c15b78ab4b9743a085ccc9dfd577.jpg',
//   'https://s13emagst.akamaized.net/products/32170/32169398/images/res_110fe86401f58b10a8a223b14f017a8a.jpg',
// ];
const colors = ['red', 'blue', 'green', 'black', 'purple', 'yellow'];

const Create: FC<{ categories: ICategory[] }> = ({ categories }) => {
  const [images, setImages] = useState<string[]>([noImage, noImage, noImage, noImage]);
  const [currentImage, setCurrentImage] = useState(images[0]);

  const changeImageHandler = (src: string) => {
    setCurrentImage(src);
  };

  const {
    value: emailValue,
    isValid: emailIsValid,
    errorMessage: emailErrorMessage,
    hasError: emailHasError,
    blurHandler: emailBlurHandler,
    changeHandler: emailChangeHandler,
    resetHandler: emailReset,
  } = useInput(emailValidation);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  const uploadFilesHandler = (files: string[]) => {
    setImages((prev) => [...prev, ...files].reverse().slice(0, 4));
    setCurrentImage(files[0]);
  };
  const selectColorHandler = (color: {}) => {
    console.log(color);
  };

  return (
    <Card classes={styles.card}>
      <h2>Create Page</h2>
      <div className={styles.container}>
        <div className={styles.left}>
          <PreviewImages
            classes={styles.photos}
            images={images}
            onChangeImage={changeImageHandler}
            currentImage={currentImage}
          />
          <ImageUpload
            onUploadFiles={uploadFilesHandler}
            text='Upload Images'
            classes={styles['upload-button']}
          />
          <div className={styles['category-select']}>
            <select>
              <option>Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c.category}>
                  {c.category}
                </option>
              ))}
            </select>
            <span className={styles['select-icon']}>
              <FontAwesomeIcon icon={faSortDown} />
            </span>
          </div>
          <h4>Select available colors</h4>
          <Colors colors={colors} inputType='checkbox' onSelectColor={selectColorHandler} />
        </div>

        <Form onSubmitHandler={onSubmitHandler} isLoading={false}>
          <div className={styles['form-row']}>
            <FormGroup
              label='Name'
              name='name'
              icon={faSignature}
              errorMessage={emailErrorMessage}
              hasError={emailHasError}
              isValid={emailIsValid}
            >
              <input
                type='text'
                name='name'
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
            </FormGroup>
            <FormGroup
              label='Price'
              name='price'
              icon={faHandHolding}
              errorMessage={emailErrorMessage}
              hasError={emailHasError}
              isValid={emailIsValid}
            >
              <input
                type='number'
                name='price'
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
            </FormGroup>
          </div>
          <div className={styles['form-row']}>
            <FormGroup
              label='Year'
              name='year'
              icon={faCalendar}
              errorMessage={emailErrorMessage}
              hasError={emailHasError}
              isValid={emailIsValid}
            >
              <input
                type='text'
                name='year'
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
            </FormGroup>
            <FormGroup
              label='Available Pieces'
              name='availablePieces'
              icon={faCubes}
              errorMessage={emailErrorMessage}
              hasError={emailHasError}
              isValid={emailIsValid}
            >
              <input
                type='number'
                name='availablePieces'
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
            </FormGroup>
          </div>
          <div className={styles['form-row']}>
            <FormGroup
              label='Brand'
              name='brand'
              icon={faCopyright}
              errorMessage={emailErrorMessage}
              hasError={emailHasError}
              isValid={emailIsValid}
            >
              <input
                type='text'
                name='brand'
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
            </FormGroup>
            <FormGroup
              label='Model'
              name='model'
              icon={faStamp}
              errorMessage={emailErrorMessage}
              hasError={emailHasError}
              isValid={emailIsValid}
            >
              <input
                type='text'
                name='model'
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
            </FormGroup>
          </div>
          <FormGroup
            classes={styles.description}
            label='Description'
            name='description'
            icon={faComment}
            errorMessage={emailErrorMessage}
            hasError={emailHasError}
            isValid={emailIsValid}
          >
            <textarea onChange={emailChangeHandler} onBlur={emailBlurHandler} />
          </FormGroup>
          <FormActions responseError={'errorMessage'}>
            <Button classes='' disabled={false}>
              Add new Item
            </Button>
          </FormActions>
        </Form>
      </div>
    </Card>
  );
};

export default Create;
