export interface ICategoryProduct {
  _id: string;
  name: string;
  category: string;
  year: number;
  price: number;
  brand: string;
  model: string;
  images: string[];
  colors: string[];
  availablePieces: number;
  description: string;
  rating: number;
}
