export interface ICartProduct {
  _id: string;
  name: string;
  category: string;
  year: number;
  price: number;
  brand: string;
  model: string;
  images: string[];
  colors: string[];
  taxes: number;
  availablePieces: number;
  inStock: boolean;
  description: string;
  rating: number;
  finalPrice: number;
  quantity: number;
}
