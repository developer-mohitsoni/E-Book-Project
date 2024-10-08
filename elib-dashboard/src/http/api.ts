import { config } from "@/config/config";
import useTokenStore from "@/store";
import { Book, RegisterResponse } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: config.serverURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers = { Authorization: `Bearer ${token}` };
    }
  }
  return config;
});

export const login = async (data: { email: string; password: string }) =>
  api.post("/api/users/login", data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> =>{
  const response = await api.post("/api/users/register", data);

  return response.data as RegisterResponse;
}

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get("/api/books");

  return response.data as Book[];
};

export const createBook = async (data: FormData) => {
  api.post("/api/books", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getBooksById = async (bookId: string) => {
  const response = await api.get(`/api/books/${bookId}`);

  return response.data as Book;
};

export const updateBookById = async (bookId: string, data: FormData) => {
  api.put(`/api/books/${bookId}`, data, {
    headers: {
      "Content-Type": "m-ultipart/form-data",
    },
  });
};

export const deleteBookById = async (bookId: string) => {
  const response = await api.delete(`/api/books/${bookId}`);
  return response.data;
};
