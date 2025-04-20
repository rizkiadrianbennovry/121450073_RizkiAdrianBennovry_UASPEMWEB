import React, { useState } from 'react';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookForm from '../../components/BookForm/BookForm';

const Home = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Manajemen Buku Pribadi</h1>
        <p className="text-gray-600 text-lg">Kelola koleksi bacaan Anda dengan mudah</p>
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
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Buku
        </button>
      </div>

      {/* Book List Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <BookList filter={filter} search={search} />
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold">Tambah Buku Baru</h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <BookForm onSubmitComplete={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;