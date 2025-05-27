import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { BookProvider } from './context/BookContext';   // ← import BookProvider
import ProtectedRoute from './auth/ProtectedRoute';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Login from './pages/Login';
import Register from './pages/Register';

// Komponen Navigasi dengan tombol Logout jika user sudah login
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-indigo-200 transition-colors">
          <img src="/logo_manajemen-removebg-preview.png" alt="Logo" className="w-14 h-14" />
          <span>BOOK MANAGEMENT</span>
        </Link>

        <div className="space-x-4">
          {user ? (
            <>              
              <Link to="/" className="hover:bg-indigo-700 px-3 py-2 rounded transition-colors">
                Home
              </Link>
              <Link to="/stats" className="hover:bg-indigo-700 px-3 py-2 rounded transition-colors">
                Statistics
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-2 py-1.5 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>              
              {/* <Link to="/login" className="hover:bg-indigo-700 px-3 py-2 rounded transition-colors">
                Login
              </Link>
              <Link to="/register" className="hover:bg-indigo-700 px-3 py-2 rounded transition-colors">
                Register
              </Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Komponen utama App
const App = () => (
  <AuthProvider>
    <BookProvider>           {/* ← wrap dengan BookProvider */}
      <Router>
        <Navbar />

        <main className="container mx-auto p-4 min-h-screen">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <Stats />
                </ProtectedRoute>
              }
            />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </BookProvider>
  </AuthProvider>
);

export default App;