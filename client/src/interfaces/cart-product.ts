export interface ICartProduct {
  _id: string;
  price: number;
  finalPrice: number;
  taxes: number;
  imageUrl: string;
  title: string;
  rating: number;
  inStock: boolean;
  color: string;
  quantity: number;
  isFavorite: boolean;
}
