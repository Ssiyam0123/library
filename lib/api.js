import axios from "axios";
import { useAuthStore } from "../store/authStore.js";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const createBook = async (bookData, token) => {
  const res = await api.post("/books", bookData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchBooks = async ({ pageParam = 1, token }) => {
  const res = await api.get(`/books?page=${pageParam}&limit=5`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// export const fetchBook = async (page = 1, limit = 5, token) => {
//   const res = await api.get(`/books?page=${page}&limit=${limit}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };

export const fetchUserBooks = async (token) => {
  const res = await api.get("/books/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};



export const deleteBook = async (bookId, token) => {
  const res = await api.delete(`/books/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
