// import { History } from 'history';
// import { IUser } from '../../interfaces/user';
// import { http } from '../../util/http-request';
// import { AppDispatch } from '../store';
// import { authenticate, loginError,registerError, loading, login, register, logout } from './cart-slice';

// export const loginAction = (userData: { email: string; password: string },history:History) => async (dispatch: AppDispatch) => {
//     dispatch(loading(true));
//     dispatch(loginError(''));
//     try {
//         const data = await http.post('auth/login', userData);
//         dispatch(login(data));
//         history.replace('/');
//     } catch (err: any) {
//         dispatch(loginError(err.message));
//     } finally {
//         dispatch(loading(false));
//     }
// };

// export const registerAction = (userData: IUser,history:History) => async (dispatch: AppDispatch) => {
//     dispatch(loading(true));
//     dispatch(registerError(''));
//     try {
//         const data = await http.post('auth/register', userData);
//         dispatch(register(data));
//     } catch (err: any) {
//         dispatch(registerError(err.message));
//     } finally {
//         dispatch(loading(false));
//     }
// };

// export const authenticateAction = () => async (dispatch: AppDispatch) => {
//     dispatch(loading(true));
//     try {
//         const data = await http.get('auth/profile');
//         dispatch(authenticate(data));
//         dispatch(loading(false));
//     } catch (err: any) {
//         console.log(err);
        
//         dispatch(loading(false));
//     } 
// };

// export const logoutAction = () => async (dispatch: AppDispatch) => {
//     await http.post('auth/logout');
//     dispatch(logout());
// };