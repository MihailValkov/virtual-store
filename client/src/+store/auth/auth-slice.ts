import { createSlice } from '@reduxjs/toolkit';
import { IAddress, IUser } from '../../interfaces/user';

export interface IAuthState {
  user: IUser | null;
  loginError: string;
  registerError: string;
  isLoading: boolean;
}

export const initialAuthState: IAuthState = {
  user: null,
  loginError: '',
  registerError: '',
  isLoading: false,
};

const authSlice = createSlice({
  initialState: initialAuthState,
  name: 'auth',
  reducers: {
    authenticate: (state, action) => ({ ...state, user: action.payload }),
    login: (state, action) => ({ ...state, user: action.payload }),
    loginError: (state, action) => ({ ...state, loginError: action.payload }),
    register: (state, action) => ({ ...state, user: action.payload }),
    registerError: (state, action) => ({ ...state, registerError: action.payload }),
    update: (state, action) => ({ ...state, user: action.payload }),
    loading: (state, action) => ({ ...state, isLoading: action.payload }),
    addNewAddress: (state, action) => ({ ...state, user: action.payload }),
    changeCurrentAddress: (state, action) => {
      if (state.user && state.user.deliveryAddresses.length !== 0) {
        state.user.deliveryAddresses = state.user.deliveryAddresses.map((a) =>
          a._id === action.payload.id ? { ...a, default: true } : { ...a, default: false }
        );
      }
      return state;
    },
    logout: () => initialAuthState,
  },
});

export const authReducer = authSlice.reducer;
export const {
  login,
  loginError,
  register,
  registerError,
  logout,
  authenticate,
  loading,
  addNewAddress,
  changeCurrentAddress,
} = authSlice.actions;
