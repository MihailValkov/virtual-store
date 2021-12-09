export interface ICartProduct {
  _id: string;
  price: number;
  finalPrice: number;
  taxes: number;
  imageUrl: string;
  name: string;
  rating: number;
  inStock: boolean;
  color: string;
  quantity: number;
}
