import { History } from 'history';
import { IAddress, IBaseAddress } from '../../interfaces/user';
import { http } from '../../util/http-request';
import { AppDispatch } from '../store';
import {
  authenticate,
  loginError,
  registerError,
  loading,
  login,
  register,
  logout,
  addNewAddress,
  changeCurrentAddress,
  updateUserInformation,
  error,
  editAddress,
  deleteAddress,
  updateUserAvatar,
} from './auth-slice';

export const loginAction =
  (userData: { email: string; password: string }, history: History) =>
  async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    dispatch(loginError(''));
    try {
      const data = await http.post('auth/login', userData);
      dispatch(login(data));
      history.replace('/categories');
    } catch (err: any) {
      dispatch(loginError(err.message));
    } finally {
      dispatch(loading(false));
    }
  };

export const registerAction =
  (userData: { email: string; password: string; repeatPassword: string }, history: History) =>
  async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    dispatch(registerError(''));
    try {
      const data = await http.post('auth/register', userData);
      dispatch(register(data));
      history.replace('/categories');
    } catch (err: any) {
      dispatch(registerError(err.message));
    } finally {
      dispatch(loading(false));
    }
  };

export const authenticateAction = () => async (dispatch: AppDispatch) => {
  dispatch(loading(true));
  try {
    const data = await http.get('auth/profile');
    dispatch(authenticate(data));
  } catch (err: any) {
  } finally {
    dispatch(loading(false));
  }
};

export const logoutAction = () => async (dispatch: AppDispatch) => {
  await http.post('auth/logout');
  dispatch(logout());
};

export const addNewDeliveryAddressAction =
  (newAddress: IBaseAddress, onClose: () => void) => async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    dispatch(error({ message: '' }));
    try {
      const data = await http.post('auth/address', newAddress);
      dispatch(addNewAddress({ newAddress: data }));
      onClose();
    } catch (err: any) {
      dispatch(error({ message: err.message || err.error.message }));
    } finally {
      dispatch(loading(false));
    }
  };

export const deleteDeliveryAddressAction =
  (id: string, onClose: () => void) => async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    dispatch(error({ message: '' }));
    try {
      const data = await http.del(`auth/address/${id}`);
      dispatch(deleteAddress({ address: data }));
      onClose();
    } catch (err: any) {
      dispatch(error({ message: err.message || err.error.message }));
    } finally {
      dispatch(loading(false));
    }
  };

export const editDeliveryAddressAction =
  (address: IAddress, onClose: () => void) => async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    dispatch(error({ message: '' }));
    try {
      const data = await http.put(`auth/address/${address._id}`, address);
      dispatch(editAddress({ address: data }));
      onClose();
    } catch (err: any) {
      dispatch(error({ message: err.message || err.error.message }));
    } finally {
      dispatch(loading(false));
    }
  };

export const changeCurrentAddressAction = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(loading(true));
  dispatch(error({ message: '' }));
  try {
    const updatedAddress = await http.get(`auth/address/${id}`);
    dispatch(changeCurrentAddress({ updatedAddress, id }));
  } catch (err: any) {
    dispatch(error({ message: err.message || err.error.message }));
  } finally {
    dispatch(loading(false));
  }
};

export const updateUserInformationAction =
  (data: {}, onClose: () => void) => async (dispatch: AppDispatch) => {
    dispatch(loading(true));
    dispatch(error({ message: '' }));
    try {
      const updatedUser = await http.patch('auth/profile', data);
      dispatch(updateUserInformation({ updatedUser }));
      onClose();
    } catch (err: any) {
      dispatch(error({ message: err.message || err.error.message }));
    } finally {
      dispatch(loading(false));
    }
  };

export const updateUserAvatarAction = (formData: FormData) => async (dispatch: AppDispatch) => {
  dispatch(loading(true));
  dispatch(error({ message: '' }));
  try {
    const response = await http.post('upload/users', formData);
    dispatch(updateUserAvatar({ image: response }));
  } catch (err: any) {
    dispatch(error({ message: err.message || err.error.message }));
  } finally {
    dispatch(loading(false));
  }
};
