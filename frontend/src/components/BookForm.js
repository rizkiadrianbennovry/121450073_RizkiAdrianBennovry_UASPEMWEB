import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BookContext } from '../context/BookContext';

const BookForm = ({ existingBook, onSubmitComplete }) => {
  const isEditing = Boolean(existingBook);
  const [form, setForm] = useState({
    title: '',
    author: '',
    status: 'Owned by',
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
      setError('Title and author are required!');
      return;
    }

    if (isEditing) {
      updateBook(existingBook.id, form);
    } else {
      addBook({ ...form, id: Date.now() });
    }

    setForm({ title: '', author: '', status: 'Owned by' });
    setError('');
    onSubmitComplete?.();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-6">
      <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Book title</label>
          <input
            type="text"
            placeholder="Enter the book title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            placeholder="Author name"
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
            <option value="Owned by">Owned by</option>
            <option value="Read">Currently Reading</option>
            <option value="Want to Buy">Want to Buy</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Add Book'}
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