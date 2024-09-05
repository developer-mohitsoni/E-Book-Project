export interface Book {
  _id: string;
  title: string;
  description: string;
  genre: string;
  author: string;
  coverImage: string;
  file: string;
  createdAt: string;
}

export interface Author {
  _id: string;
  name: string;
}
