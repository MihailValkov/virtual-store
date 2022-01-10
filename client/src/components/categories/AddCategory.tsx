import { FC, FormEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { faSignature } from '@fortawesome/free-solid-svg-icons';

import useInput from '../../hooks/use-input';
import { AppRootState } from '../../+store/store';
import { categoryNameValidation } from '../../util/validations';
import {
  addNewCategoryAction,
  uploadCategoryImageAction,
} from '../../+store/categories/categories-actions';

import Button from '../shared/Button';
import Card from '../shared/Card';
import Form from '../shared/Form/Form';
import FormActions from '../shared/Form/FormActions';
import FormGroup from '../shared/Form/FormGroup';
import ImageUpload from '../shared/Form/ImageUpload';
import PreviewImages from '../shared/PreviewImages';

import noImage from '../../assets/no-image.png';
import styles from './AddCategory.module.css';

const AddCategory: FC<{}> = () => {
  const dispatch = useDispatch();
  const image = useSelector((state: AppRootState) => state.categories.currentCategoryImage);
  const uploadImageIsLoading = useSelector(
    (state: AppRootState) => state.categories.uploadImageIsLoading
  );
  const uploadImageErrorMessage = useSelector(
    (state: AppRootState) => state.categories.uploadImageErrorMessage
  );
  const addNewCategoryIsLoading = useSelector(
    (state: AppRootState) => state.categories.createCategoryIsLoading
  );
  const addNewCategoryErrorMessage = useSelector(
    (state: AppRootState) => state.categories.createCategoryErrorMessage
  );
  const {
    value: categoryNameValue,
    isValid: categoryNameIsValid,
    errorMessage: categoryNameErrorMessage,
    hasError: categoryNameHasError,
    blurHandler: categoryNameBlurHandler,
    changeHandler: categoryNameChangeHandler,
  } = useInput(categoryNameValidation);

  const uploadImageHandler = useCallback(
    (files: FileList) => {
      const image = files[0];
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        dispatch(uploadCategoryImageAction(formData));
      }
    },
    [dispatch]
  );

  const formIsValid = categoryNameIsValid && image;

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (formIsValid) {
      dispatch(addNewCategoryAction({ category: categoryNameValue, image }));
    }
  };

  return (
    <Card classes={styles.card}>
      <h2>Add New Category</h2>
      <div className={styles.container}>
        <div>
          <PreviewImages
            classes={styles.photo}
            isLoading={uploadImageIsLoading}
            currentImage={image?.url || noImage}
          />
          <ImageUpload
            onUploadFiles={uploadImageHandler}
            errorMessage={uploadImageErrorMessage}
            text='Upload Image'
            classes={styles['upload-button']}
          />
        </div>
        <Form onSubmitHandler={onSubmitHandler} isLoading={addNewCategoryIsLoading}>
          <FormGroup
            label='Category Name'
            name='categoryName'
            icon={faSignature}
            errorMessage={categoryNameErrorMessage}
            hasError={categoryNameHasError}
            isValid={categoryNameIsValid}
          >
            <input
              type='text'
              name='categoryName'
              value={categoryNameValue}
              onChange={categoryNameChangeHandler}
              onBlur={categoryNameBlurHandler}
            />
          </FormGroup>
          <FormActions responseError={addNewCategoryErrorMessage}>
            <Button type='submit' disabled={!formIsValid}>
              Add new Category
            </Button>
          </FormActions>
        </Form>
      </div>
    </Card>
  );
};

export default AddCategory;
