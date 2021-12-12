import { ICartProduct } from './cart-product';
export interface IOrder {
  _id: string;
  date: string;
  address: string;
  status: string;
  products: ICartProduct[];
  totalQuantity: number;
  totalPrice: number;
}
