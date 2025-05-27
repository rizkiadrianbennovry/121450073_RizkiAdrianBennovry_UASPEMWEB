// frontend/src/auth/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import axios from '../api/axios';  // pastikan path ini sesuai (src/api/axios.js)

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // REGISTER dengan try/catch dan return { success, message or user }
  const register = async (username, password) => {
    try {
      const res = await axios.post('/auth/register', { username, password });
      // res.data berisi { id, username } dari backend
      return { success: true, user: res.data };
    } catch (err) {
      // ambil pesan error dari response, fallback ke err.message
      const message = err.response?.data?.error || err.message;
      return { success: false, message };
    }
  };

  // LOGIN dengan try/catch; simpan token & user ke localStorage
  const login = async (username, password) => {
    try {
      const res = await axios.post('/auth/login', { username, password });
      const { token, user: userData } = res.data;
      // simpan token & user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      return { success: false, message };
    }
  };

  // LOGOUT: clear storage & state
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk mengakses context
export const useAuth = () => useContext(AuthContext);
