import React, { useContext } from 'react';
import { BookContext } from '../../context/BookContext';

const BookList = ({ filter, search }) => {
  const { books, deleteBook } = useContext(BookContext);

  const filteredBooks = books.filter(book => 
    (filter === 'all' || book.status === filter) &&
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'milik': return 'bg-green-100 text-green-800';
      case 'baca': return 'bg-blue-100 text-blue-800';
      case 'beli': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Judul</th>
            <th className="px-6 py-3 text-left">Penulis</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredBooks.map(book => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{book.title}</td>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(book.status)}`}>
                  {book.status === 'milik' ? 'Milik' : book.status === 'baca' ? 'Dibaca' : 'Ingin Beli'}
                </span>
              </td>
              <td className="px-6 py-4 space-x-2">
                <button 
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => {/* Fungsi edit */}}
                >
                  Edit
                </button>
                <button 
                  className="text-red-600 hover:text-red-900"
                  onClick={() => deleteBook(book.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;