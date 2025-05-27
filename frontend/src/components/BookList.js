import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';

const BookList = ({ filter, search,onEdit }) => {
  const { books, deleteBook } = useContext(BookContext);

  const filteredBooks = books.filter(book => 
    (filter === 'All' || book.status === filter) &&
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Owned by': return 'bg-green-100 text-green-800';
      case 'Read': return 'bg-blue-100 text-blue-800';
      case 'Want to Buy': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Book title</th>
            <th className="px-6 py-3 text-left">Author</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredBooks.map(book => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{book.title}</td>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(book.status)}`}>
                  {book.status === 'Owned by' ? 'Owned by' : book.status === 'Read' ? 'Read' : 'Want to Buy'}
                </span>
              </td>
              <td className="px-6 py-4 space-x-2">
                <button 
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => onEdit(book)}
                >
                  Update
                </button>
                <button 
                  className="text-red-600 hover:text-red-900"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
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