import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import BookList from '../components/BookList';
import BookFilter from '../components/BookFilter';
import BookForm from '../components/BookForm';

const Home = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section  */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 {user ? `Hello ${user.username} This Yours` : 'Your'} Personal Book Management.</h1>
        <p className="text-gray-600 text-lg">Manage Your Books Reading Collection Easily.</p>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <BookFilter 
          filter={filter} 
          setFilter={setFilter} 
          search={search} 
          setSearch={setSearch} 
        />
        
        <button
        onClick={() => {
            setEditingBook(null);      // clear editing
            setShowForm(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Book
        </button>
      </div>

      {/* Book List Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <BookList 
        filter={filter} 
        search={search}
        onEdit={(book) => {
          setEditingBook(book);
          setShowForm(true);
        }}
       />
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold"> {editingBook ? 'Update Books' : 'Add My New Book'} </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <BookForm existingBook={editingBook} onSubmitComplete={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;