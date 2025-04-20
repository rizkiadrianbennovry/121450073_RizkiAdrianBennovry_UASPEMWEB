import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BookContext } from '../../context/BookContext';

const BookForm = ({ existingBook, onSubmitComplete }) => {
  const isEditing = Boolean(existingBook);
  const [form, setForm] = useState({
    title: '',
    author: '',
    status: 'milik',
  });
  const [error, setError] = useState('');
  const { addBook, updateBook } = useContext(BookContext);

  useEffect(() => {
    if (isEditing) {
      setForm({
        title: existingBook.title,
        author: existingBook.author,
        status: existingBook.status,
      });
    }
  }, [existingBook, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setError('Judul dan penulis wajib diisi!');
      return;
    }

    if (isEditing) {
      updateBook(existingBook.id, form);
    } else {
      addBook({ ...form, id: Date.now() });
    }

    setForm({ title: '', author: '', status: 'milik' });
    setError('');
    onSubmitComplete?.();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-6">
      <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul Buku</label>
          <input
            type="text"
            placeholder="Masukkan judul buku"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
          <input
            type="text"
            placeholder="Nama penulis"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={form.author}
            onChange={(e) => setForm({...form, author: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={form.status}
            onChange={(e) => setForm({...form, status: e.target.value})}
          >
            <option value="milik">Milik</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {isEditing ? 'Simpan Perubahan' : 'Tambahkan Buku'}
        </button>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  existingBook: PropTypes.object,
  onSubmitComplete: PropTypes.func,
};

export default BookForm;