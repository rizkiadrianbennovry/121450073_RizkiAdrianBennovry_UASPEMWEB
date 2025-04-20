import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm';
import { BookContext } from '../context/BookContext';

test('menampilkan form tambah buku', () => {
  const mockAddBook = jest.fn();
  render(
    <BookContext.Provider value={{ addBook: mockAddBook }}>
      <BookForm />
    </BookContext.Provider>
  );

  expect(screen.getByPlaceholderText(/Judul/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Penulis/i)).toBeInTheDocument();
});

test('validasi input kosong', () => {
  const mockAddBook = jest.fn();
  render(
    <BookContext.Provider value={{ addBook: mockAddBook }}>
      <BookForm />
    </BookContext.Provider>
  );

  fireEvent.click(screen.getByText(/Tambah/i));
  expect(screen.getByText(/wajib diisi/i)).toBeInTheDocument();
});

// Tambah 3 test lainnya: untuk edit, penghapusan, filter, dll
