import React, { useReducer, useCallback, useEffect } from 'react';
import { IValidationFn } from '../util/validations';
import { initialState, reducer } from './input-reducer';

const useInput = (validateValue: IValidationFn) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (state.touched) {
        const { isValid, message } = validateValue(state.value);
        dispatch({
          type: 'error',
          error: !isValid && state.touched,
          errorMessage: message,
          isValid,
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [validateValue, state.touched, state.value]);

  const changeHandler = useCallback(
    ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: 'change', value });
    },
    []
  );
  const blurHandler = useCallback(() => {
    dispatch({ type: 'blur' });
  }, []);
  const resetHandler = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  return {
    value: state.value,
    isValid: state.isValid,
    hasError: state.hasError,
    errorMessage: state.errorMessage,
    changeHandler,
    blurHandler,
    resetHandler,
  };
};
export default useInput;
