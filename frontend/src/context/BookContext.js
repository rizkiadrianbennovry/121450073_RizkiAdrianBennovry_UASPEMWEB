// frontend/src/context/BookContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../auth/AuthContext'; //add new

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth(); //add new

  // Mengambil data buku milik user saat mount
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchBooks();
  // }, []);
  useEffect(() => {
    if (user) {
      fetchBooks();
    } else {
      // logout atau user null → kosongkan list
      setBooks([]);
    }
  }, [user]);

  const addBook = async (book) => {
    setError(null);
    try {
      await axios.post('/books', book);
      await fetchBooks();
    } catch (err) {
      console.error('Error adding book:', err);
      setError(err);
    }
  };

  const updateBook = async (id, book) => {
    setError(null);
    try {
      await axios.put(`/books/${id}`, book);
      await fetchBooks();
    } catch (err) {
      console.error('Error updating book:', err);
      setError(err);
    }
  };

  const deleteBook = async (id) => {
    setError(null);
    try {
      await axios.delete(`/books/${id}`);
      await fetchBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
      setError(err);
    }
  };

  return (
    <BookContext.Provider
      value={{ books, loading, error, addBook, updateBook, deleteBook }}
    >
      {children}
    </BookContext.Provider>
  );
}
