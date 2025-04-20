// src/context/BookContext.js
import React, { createContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);

  const addBook = (book) => setBooks([...books, book]);

  const updateBook = (id, updatedBook) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, ...updatedBook } : book)));
  };

  const deleteBook = (id) => setBooks(books.filter((book) => book.id !== id));

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};
