export interface IBaseAddress {
  country: string;
  city: string;
  street: string;
  streetNumber: number;
}
export interface IAddress extends IBaseAddress {
  _id: string;
  default: boolean;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  role: string;
  phone: string;
  address: IAddress;
  deliveryAddresses: IAddress[];
  image: {
    _id: string;
    url: string;
  };
  orders: string[];
  comments: {
    productId: string;
    comment: string;
    status: string;
    rating: number;
  }[];
  createdAt: string;
  updatedAt: string;
}
export interface IAdminUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  orders: number;
  comments: number;
}
