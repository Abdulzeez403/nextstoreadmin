export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tag: string;
  swapping?: boolean;
  stock: number;
  images?: string[];
  rating?: number;
  numReviews?: number;
  specifications?: ISpecification[];
}

export interface ISpecification {
  key: string;
  value: string;
}
