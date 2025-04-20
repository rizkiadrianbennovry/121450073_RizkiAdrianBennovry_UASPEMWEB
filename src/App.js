import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';

const App = () => (
  <BookProvider>
    <Router>
      <nav className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-indigo-200 transition-colors">
            MANAJEMENBUKU
          </Link>
          <div className="space-x-4">
            <Link
              to="/"
              className="hover:bg-indigo-700 px-3 py-2 rounded transition-colors"
            >
              Beranda
            </Link>
            <Link
              to="/stats"
              className="hover:bg-indigo-700 px-3 py-2 rounded transition-colors"
            >
              Statistik
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    </Router>
  </BookProvider>
);

export default App;
