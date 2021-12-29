import { FC, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { emailValidation, passwordValidation } from '../../util/validations';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import useInput from '../../hooks/use-input';
import { AppRootState } from '../../+store/store';
import { loginAction } from '../../+store/auth/auth-actions';
import { loginError } from '../../+store/auth/auth-slice';

import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import FormGroup from '../../components/shared/Form/FormGroup';
import Form from '../../components//shared/Form/Form';
import FormActions from '../../components/shared/Form/FormActions';

const LoginPage: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: AppRootState) => state.auth.isLoading);
  const errorMessage = useSelector((state: AppRootState) => state.auth.loginError);

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

  useEffect(() => {
    return () => {
      dispatch(loginError(''));
    };
  }, [dispatch]);

  const formIsValid = emailIsValid && passwordIsValid;

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    dispatch(loginAction({ email: emailValue, password: passwordValue }, history));
    emailReset();
    passwordReset();
  };

  return (
      <Card>
        <h2>Login Page</h2>
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
          <FormActions responseError={errorMessage}>
            <Button classes='' disabled={!formIsValid} type='submit'>
              Login
            </Button>
          </FormActions>
        </Form>
      </Card>
  );
};

export default LoginPage;
