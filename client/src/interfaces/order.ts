import { ICartProduct } from './cart-product';

export interface IOrder {
  _id: string;
  createdAt: string;
  deliveryAddress: string;
  totalPrice: number;
  taxes: number;
  status: string;
  products: ICartProduct[];
}
export interface ICreateOrder {
  userId: string;
  deliveryAddress: string;
  totalPrice: number;
  taxes: number;
  paymentMethod: string;
  products: {
    _id: string;
    quantity: number;
    selectedColor: string;
    finalPrice: number;
  }[];
}

export interface IAdminOrder {
  _id: string;
  userId: string;
  username: string;
  deliveryAddress: string;
  createdAt: string;
  status: string;
  amount: number;
  totalPrice: number;
  paymentMethod: string;
}
