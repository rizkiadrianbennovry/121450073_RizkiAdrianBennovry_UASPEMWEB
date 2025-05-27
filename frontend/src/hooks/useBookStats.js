// src/hooks/useBookStats.js
import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

const useBookStats = () => {
  const { books } = useContext(BookContext);

  const total = books.length;
  const owned = books.filter((book) => book.status === 'Owned by').length;
  const reading = books.filter((book) => book.status === 'Read').length;
  const wishlist = books.filter((book) => book.status === 'Want to Buy').length;

  return { total, owned, reading, wishlist };
};

export default useBookStats;