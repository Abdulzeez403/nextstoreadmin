export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tag: string;
  stock: number;
  images?: IImage[];
  rating?: number;
  numReviews?: number;
  specifications?: ISpecification[];
}

export interface IImage {
  url: string;
  type: string;
  name: string;
  thumbUrl?: string;
}

export interface ISpecification {
  key: string;
  value: string;
}
