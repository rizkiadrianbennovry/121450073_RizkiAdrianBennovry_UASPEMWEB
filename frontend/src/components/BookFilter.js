import React from 'react';
import PropTypes from 'prop-types';

const BookFilter = ({ filter, setFilter, search, setSearch }) => (
  <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Type Your Book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <svg 
          className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div className="flex flex-wrap gap-2">
        {['All', 'Owned by', 'Read', 'Want to Buy'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === status ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'All' ? 'All' : 
             status === 'Owned by' ? 'Owned by' : 
             status === 'Read' ? 'Read' : 'Want to Buy'}
          </button>
        ))}
      </div>
    </div>
  </div>
);

BookFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default BookFilter;