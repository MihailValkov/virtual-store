import { FC, FormEvent, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useInput from '../../../hooks/use-input';
import { productValidations } from '../../../util/validations';
import { AppRootState } from '../../../+store/store';
import { ICategory } from '../../../interfaces/category';
import {
  addNewProductAction,
  uploadProductImagesAction,
} from '../../../+store/products/products-actions';

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

import Card from '../../shared/Card';
import Form from '../../shared/Form/Form';
import FormGroup from '../../shared/Form/FormGroup';
import FormActions from '../../shared/Form/FormActions';
import Button from '../../shared/Button';
import ImageUpload from '../../shared/Form/ImageUpload';
import Colors from '../../shared/Colors';
import PreviewImages from '../../shared/PreviewImages';

import styles from './Create.module.css';
import noImage from '../../../assets/no-image.png';
import FormRow from '../../shared/Form/FormRow';

const colors = ['red', 'blue', 'green', 'black', 'purple', 'yellow'];

const Create: FC<{ categories: ICategory[] }> = ({ categories }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const uploadImages = useSelector((state: AppRootState) => state.products.currentImages.images);
  const isLoading = useSelector((state: AppRootState) => state.products.currentImages.isLoading);
  const error = useSelector((state: AppRootState) => state.products.currentImages.error);
  const images = useMemo(
    () => (uploadImages || []).concat(new Array(5).fill(noImage)).slice(0, 5),
    [uploadImages]
  );
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Select Category');

  const {
    value: nameValue,
    isValid: nameIsValid,
    errorMessage: nameErrorMessage,
    hasError: nameHasError,
    blurHandler: nameBlurHandler,
    changeHandler: nameChangeHandler,
    resetHandler: nameReset,
  } = useInput(productValidations.name);
  const {
    value: priceValue,
    isValid: priceIsValid,
    errorMessage: priceErrorMessage,
    hasError: priceHasError,
    blurHandler: priceBlurHandler,
    changeHandler: priceChangeHandler,
    resetHandler: priceReset,
  } = useInput(productValidations.price);
  const {
    value: yearValue,
    isValid: yearIsValid,
    errorMessage: yearErrorMessage,
    hasError: yearHasError,
    blurHandler: yearBlurHandler,
    changeHandler: yearChangeHandler,
    resetHandler: yearReset,
  } = useInput(productValidations.year);
  const {
    value: availablePiecesValue,
    isValid: availablePiecesIsValid,
    errorMessage: availablePiecesErrorMessage,
    hasError: availablePiecesHasError,
    blurHandler: availablePiecesBlurHandler,
    changeHandler: availablePiecesChangeHandler,
    resetHandler: availablePiecesReset,
  } = useInput(productValidations.availablePieces);
  const {
    value: brandValue,
    isValid: brandIsValid,
    errorMessage: brandErrorMessage,
    hasError: brandHasError,
    blurHandler: brandBlurHandler,
    changeHandler: brandChangeHandler,
    resetHandler: brandReset,
  } = useInput(productValidations.brand);
  const {
    value: modelValue,
    isValid: modelIsValid,
    errorMessage: modelErrorMessage,
    hasError: modelHasError,
    blurHandler: modelBlurHandler,
    changeHandler: modelChangeHandler,
    resetHandler: modelReset,
  } = useInput(productValidations.model);
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    errorMessage: descriptionErrorMessage,
    hasError: descriptionHasError,
    blurHandler: descriptionBlurHandler,
    changeHandler: descriptionChangeHandler,
    resetHandler: descriptionReset,
  } = useInput(productValidations.description);

  const formIsValid =
    nameIsValid &&
    priceIsValid &&
    brandIsValid &&
    modelIsValid &&
    yearIsValid &&
    availablePiecesIsValid &&
    descriptionIsValid &&
    selectedColors.length > 0 &&
    uploadImages.length > 0 &&
    selectedCategory !== 'Select Category';

  const changeImageHandler = useCallback((src: string) => {
    setCurrentImage(src);
  }, []);

  const uploadFilesHandler = useCallback(
    (files: FileList) => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      dispatch(uploadProductImagesAction(formData, setCurrentImage));
    },
    [dispatch]
  );

  const selectColorHandler = useCallback((colors: {}) => {
    const selectedColors = Object.entries(colors).reduce(
      (a: string[], [k, v]) => (v !== false ? a.concat(k) : a),
      []
    );
    setSelectedColors(selectedColors);
  }, []);

  const onSelectCategoryHandler = (event: FormEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value);
  };

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const product = {
      name: nameValue,
      price: Number(priceValue),
      year: Number(yearValue),
      availablePieces: Number(availablePiecesValue),
      brand: brandValue,
      model: modelValue,
      description: descriptionValue,
      colors: selectedColors,
      category: selectedCategory,
      images: uploadImages,
    };
    dispatch(addNewProductAction(product, history));
  };

  return (
    <Card classes={styles.card}>
      <h2>Create Page</h2>
      <div className={styles.container}>
        <div className={styles.left}>
          <PreviewImages
            classes={styles.photos}
            isLoading={isLoading}
            images={images}
            onChangeImage={changeImageHandler}
            currentImage={currentImage}
          />
          <ImageUpload
            onUploadFiles={uploadFilesHandler}
            errorMessage={error}
            text='Upload Images'
            classes={styles['upload-button']}
          />
          <div className={styles['category-select']}>
            <select onChange={onSelectCategoryHandler}>
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
          <FormRow>
            <FormGroup
              label='Name'
              name='name'
              icon={faSignature}
              errorMessage={nameErrorMessage}
              hasError={nameHasError}
              isValid={nameIsValid}
            >
              <input
                type='text'
                name='name'
                value={nameValue}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              />
            </FormGroup>
            <FormGroup
              label='Price'
              name='price'
              icon={faHandHolding}
              errorMessage={priceErrorMessage}
              hasError={priceHasError}
              isValid={priceIsValid}
            >
              <input
                type='number'
                name='price'
                min='0'
                value={priceValue}
                onChange={priceChangeHandler}
                onBlur={priceBlurHandler}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup
              label='Year'
              name='year'
              icon={faCalendar}
              errorMessage={yearErrorMessage}
              hasError={yearHasError}
              isValid={yearIsValid}
            >
              <input
                type='text'
                name='year'
                value={yearValue}
                onChange={yearChangeHandler}
                onBlur={yearBlurHandler}
              />
            </FormGroup>
            <FormGroup
              label='Available Pieces'
              name='availablePieces'
              icon={faCubes}
              errorMessage={availablePiecesErrorMessage}
              hasError={availablePiecesHasError}
              isValid={availablePiecesIsValid}
            >
              <input
                type='number'
                name='availablePieces'
                value={availablePiecesValue}
                onChange={availablePiecesChangeHandler}
                onBlur={availablePiecesBlurHandler}
              />
            </FormGroup>
          </FormRow>
          <FormRow >
            <FormGroup
              label='Brand'
              name='brand'
              icon={faCopyright}
              errorMessage={brandErrorMessage}
              hasError={brandHasError}
              isValid={brandIsValid}
            >
              <input
                type='text'
                name='brand'
                value={brandValue}
                onChange={brandChangeHandler}
                onBlur={brandBlurHandler}
              />
            </FormGroup>
            <FormGroup
              label='Model'
              name='model'
              icon={faStamp}
              errorMessage={modelErrorMessage}
              hasError={modelHasError}
              isValid={modelIsValid}
            >
              <input
                type='text'
                name='model'
                value={modelValue}
                onChange={modelChangeHandler}
                onBlur={modelBlurHandler}
              />
            </FormGroup>
          </FormRow>
          <FormGroup
            classes={styles.description}
            label='Description'
            name='description'
            icon={faComment}
            errorMessage={descriptionErrorMessage}
            hasError={descriptionHasError}
            isValid={descriptionIsValid}
          >
            <textarea
              value={descriptionValue}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
            />
          </FormGroup>
          <FormActions responseError={''}>
            <Button type='submit' disabled={!formIsValid}>
              Add new Item
            </Button>
          </FormActions>
        </Form>
      </div>
    </Card>
  );
};

export default Create;
