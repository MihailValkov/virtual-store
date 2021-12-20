export interface IComment {
  _id: string;
  comment: string;
  user: {
    email: string;
    image: {
      url: string;
    };
  };
  status: string;
  rating: number;
  createdAt: string;
}
export interface IRate {
  [prop: number]: number;
}
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
  taxes: number;
  availablePieces: number;
  inStock: boolean;
  description: string;
  rating: {
    comments: IComment[];
    rate: IRate;
    totalRating: number;
  };
}
