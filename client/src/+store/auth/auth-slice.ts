import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddress, IUser } from '../../interfaces/user';

export interface IAuthState {
  user: IUser | null;
  loginError: string;
  registerError: string;
  isLoading: boolean;
  errorMessage: string | null;
}

export const initialAuthState: IAuthState = {
  user: null,
  loginError: '',
  registerError: '',
  isLoading: false,
  errorMessage: null,
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
    updateUserInformation: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        ...action.payload.updatedUser,
        deliveryAddresses: state.user?.deliveryAddresses,
      },
    }),
    updateUserAvatar: (state, action: PayloadAction<{ image: { _id: string; url: string } }>) => {
      if (state.user) {
        state.user.image = action.payload.image;
      }
      return state;
    },
    loading: (state, action) => ({ ...state, isLoading: action.payload }),
    addNewAddress: (state, action: PayloadAction<{ newAddress: IAddress }>) => {
      if (state.user && state.user?.deliveryAddresses?.length >= 0) {
        state.user.deliveryAddresses.push(action.payload.newAddress);
      }
      return state;
    },
    editAddress: (state, action: PayloadAction<{ address: IAddress }>) => {
      if (state.user && state.user.deliveryAddresses.length > 0) {
        const existingAddressIndex = state.user.deliveryAddresses.findIndex(
          (a) => a._id === action.payload.address._id
        );
        state.user.deliveryAddresses[existingAddressIndex] = action.payload.address;
      }
      return state;
    },
    deleteAddress: (state, action: PayloadAction<{ address: IAddress }>) => {
      if (state.user && state.user.deliveryAddresses.length > 0) {
        const existingAddressIndex = state.user.deliveryAddresses.findIndex(
          (a) => a._id === action.payload.address._id
        );
        state.user.deliveryAddresses.splice(existingAddressIndex, 1);
      }
      return state;
    },
    changeCurrentAddress: (state, action) => {
      if (state.user && state.user.deliveryAddresses.length !== 0) {
        state.user.deliveryAddresses = state.user.deliveryAddresses.map((a) =>
          a._id === action.payload.id ? { ...a, default: true } : { ...a, default: false }
        );
      }
      return state;
    },
    addNewCommentToProduct: (state, action) => {
      state.user?.comments.push(action.payload);
      return state;
    },
    updateUserOrdersList: (state, action) => {
      state.user?.orders.push(action.payload);
      return state;
    },
    logout: () => initialAuthState,
    error: (state, action) => ({ ...state, errorMessage: action.payload.message }),
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
  error,
  updateUserInformation,
  updateUserAvatar,
  addNewAddress,
  editAddress,
  deleteAddress,
  changeCurrentAddress,
  addNewCommentToProduct,
  updateUserOrdersList,
} = authSlice.actions;
