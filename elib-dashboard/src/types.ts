export interface Book {
  _id: string;
  title: string;
  description: string;
  genre: string;
  price: string;
  author: {
    name: string;
  };
  coverImage: string;
  file: string;
  createdAt: string;
}

export interface Author {
  _id: string;
  name: string;
}

export interface RegisterResponse {
  accessToken: string;
}
