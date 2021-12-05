import { FC, FormEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { emailValidation, passwordValidation } from '../../util/validations';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import useInput from '../../hooks/use-input';
import { registerAction } from '../../+store/auth/auth-actions';
import { registerError } from '../../+store/auth/auth-slice';
import { AppRootState } from '../../+store/store';

import FormActions from '../../components//shared/Form/FormActions';
import FormGroup from '../../components//shared/Form/FormGroup';
import Form from '../../components//shared/Form/Form';
import Button from '../../components//shared/Button';
import Card from '../../components//shared/Card';

const RegisterPage: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: AppRootState) => state.auth.isLoading);
  const errorMessage = useSelector((state: AppRootState) => state.auth.registerError);

  const {
    value: emailValue,
    isValid: emailIsValid,
    errorMessage: emailErrorMessage,
    hasError: emailHasError,
    blurHandler: emailBlurHandler,
    changeHandler: emailChangeHandler,
    resetHandler: emailReset,
  } = useInput(emailValidation);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    errorMessage: passwordErrorMessage,
    hasError: passwordHasError,
    blurHandler: passwordBlurHandler,
    changeHandler: passwordChangeHandler,
    resetHandler: passwordReset,
  } = useInput(passwordValidation);

  const {
    value: repeatPasswordValue,
    isValid: repeatPasswordIsValid,
    errorMessage: repeatPasswordErrorMessage,
    hasError: repeatPasswordHasError,
    blurHandler: repeatPasswordBlurHandler,
    changeHandler: repeatPasswordChangeHandler,
    resetHandler: repeatPasswordReset,
  } = useInput(
    useCallback(
      (value: string) =>
        new RegExp(`^${passwordValue}$`).test(value) && value.trim().length > 0
          ? { message: '', isValid: true }
          : {
              message:
                'Both passwords should match!',
              isValid: false,
            },
      [passwordValue]
    )
  );

  useEffect(() => {
    return () => {
      dispatch(registerError(''));
    };
  }, [dispatch]);

  const formIsValid = emailIsValid && passwordIsValid && repeatPasswordIsValid;

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    dispatch(
      registerAction(
        {
          email: emailValue,
          password: passwordValue,
          repeatPassword: repeatPasswordValue,
        },
        history
      )
    );
    emailReset();
    passwordReset();
    repeatPasswordReset();
  };

  return (
    <Card>
      <h2>Register Page</h2>
      <Form onSubmitHandler={onSubmitHandler} isLoading={isLoading}>
        <FormGroup
          label='Email'
          name='email'
          icon={faEnvelope}
          errorMessage={emailErrorMessage}
          hasError={emailHasError}
          isValid={emailIsValid}
        >
          <input
            type='email'
            name='email'
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
        </FormGroup>
        <FormGroup
          label='Password'
          name='password'
          icon={faLock}
          errorMessage={passwordErrorMessage}
          hasError={passwordHasError}
          isValid={passwordIsValid}
        >
          <input
            type='password'
            name='password'
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
        </FormGroup>
        <FormGroup
          label='Repeat Password'
          name='repeatPassword'
          icon={faLock}
          errorMessage={repeatPasswordErrorMessage}
          hasError={repeatPasswordHasError}
          isValid={repeatPasswordIsValid}
        >
          <input
            type='password'
            name='repeatPassword'
            value={repeatPasswordValue}
            onChange={repeatPasswordChangeHandler}
            onBlur={repeatPasswordBlurHandler}
          />
        </FormGroup>
        <FormActions responseError={errorMessage}>
          <Button classes='' disabled={!formIsValid ? true : false} type='submit'>
            Register
          </Button>
        </FormActions>
      </Form>
    </Card>
  );
};

export default RegisterPage;
