# 📚 Manajemen Buku Pribadi

![image](https://github.com/user-attachments/assets/86408ff7-2ae5-4f97-b037-c0fc88a85dea)

## 📝 Deskripsi

Aplikasi web untuk mengelola koleksi buku pribadi. Fitur utama:
- Tambah, edit, dan hapus buku
- Filter berdasarkan status: **Milik**, **Dibaca**, dan **Ingin Beli**
- Pencarian buku berdasarkan judul 
- Statistik koleksi buku
- Pembuatan akun login
- Autentikasi login dan logout
- Penyimpanan data dengan database PostgreSQL
- Backend menggunakan RESTful API berbasis Python Pyramid

## 🛠 Teknologi

### Frontend
- [React 18](https://reactjs.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [React Router 6](https://reactrouter.com/)
- Context API untuk manajemen state
- Axios untuk komunikasi dengan backend

### Backend
- Python Pyramid
- PostgreSQL sebagai database relasional
- Autentikasi dasar (basic authentication)
- RESTful API dengan route CRUD
- Unit Testing untuk endpoint kritikal (minimal 60% coverage)

## 🚀 Instalasi & Menjalankan
### Backend
1. Masuk ke folder backend dan siapkan environment:
   ```bash
   cd backend
   python -m venv env
   env\Scripts\activate     # Windows
   pip install -r requirements.txt
   ```
2. Jalankan aplikasi:
   ```bash
   pserve development.ini
   ```
3. Setup database PostgreSQL dan sesuaikan .env jika diperlukan. Pastikan Anda sudah membuat database, mengatur kredensial .env, dan menjalankan migrasi/tabel yang diperlukan.

### Frontend
1. Masuk ke folder frontend:
   ```bash
   cd frontend
   npm install
   ```
2. Jalankan aplikasi:
   ```bash
   npm start
   ```
   Akses di browser melalui `http://localhost:3000`

## 🗃️ Struktur Tabel & Query SQL
### 📦 Tabel books
Menyimpan data buku:
- id: ID buku
- title: Judul
- author: Penulis
- status: Status peminjaman
- user_id: Relasi ke ID user

### 👤 Tabel users
Menyimpan data pengguna:
- id: ID user
- username: Nama pengguna

```bash
   SELECT
      books.id        AS book_id,
      books.title,
      books.author,
      books.status,
      users.id        AS user_id,
      users.username
   FROM books
   JOIN users
   ON books.user_id = users.id;
   ```
### 🔎 SQL Query Join books dan users

## 🖼 Screenshot

| Tampilan Utama | Statistik |
|----------------|-----------|
| ![image](https://github.com/user-attachments/assets/86408ff7-2ae5-4f97-b037-c0fc88a85dea) | ![image](https://github.com/user-attachments/assets/e31ec84c-b442-450e-9272-e34854a46f81) |

| Halaman Login | Halaman Register |
|---------------|------------------|
| ![image](https://github.com/user-attachments/assets/0d498734-e451-48d2-9262-d125e2a89d9b) | ![image](https://github.com/user-attachments/assets/3ab17209-b536-40e7-87dc-6e186ed595be) |

## ⚛️ Fitur React yang Digunakan

### 1. 🔁 Routing dengan React Router
**File:** `App.js`, `auth/ProtectedRoute.js`, `pages/*.js`

**Deskripsi:**
Menggunakan `react-router-dom` untuk navigasi antar halaman. Halaman yang dilindungi (seperti Home dan Stats) hanya dapat diakses jika pengguna sudah login.

**Contoh Kode: `App.js`**
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Stats from './pages/Stats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
```

### 2. 🧠 Context API untuk Global State
**File:** `context/BookContext.js`, `auth/AuthContext.js`

**Deskripsi:**
- `AuthContext`: menyimpan status login, token, dan fungsi login/logout.
- `BookContext`: menyimpan daftar buku dan fungsi untuk menambah, mengedit, dan menghapus buku.

**Contoh Kode: `AuthContext.js`**
```jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```
Penggunaan di Komponen:
```jsx
const { user, logout } = useAuth();
```

### 3. 🧩 Komponen Reusable
**File:** `components/BookForm.js`, `BookList.js`, `BookFilter.js`

**Deskripsi:**
- `BookForm`: Formulir tambah/edit buku.
- `BookList`:  Menampilkan daftar buku.
- `BookFilter`: Filter berdasarkan kategori atau penulis.

**Contoh Kode: `BookList.js`**
```jsx
import { useBooks } from '../context/BookContext';

function BookList() {
  const { books, deleteBook } = useBooks();

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### 4. 🪝 Custom Hooks
**File:** `hooks/useBookStats.js`

**Deskripsi:**
Hook khusus untuk menghitung statistik buku, seperti total buku, buku terbanyak berdasarkan kategori, dll.

**Contoh Kode: `useBookStats.js`**
```jsx
import { useBooks } from '../context/BookContext';

export default function useBookStats() {
  const { books } = useBooks();

  const totalBooks = books.length;
  const byCategory = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {});

  return { totalBooks, byCategory };
}
```
Penggunaan di Komponen (misalnya `Stats.js`):
```jsx
const { totalBooks, byCategory } = useBookStats();
```

### 5. 📦 Axios untuk Komunikasi HTTP
**File:** `api/axios.js`

**Deskripsi:**
Digunakan untuk mengirim request ke backend (Python Pyramid) secara konsisten dan tersentralisasi.

**Contoh Kode:**
```jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' }
});

export default api;
```
Penggunaan:
```jsx
import api from '../api/axios';

const response = await api.post('/books', bookData);
```

### 6. 💽 LocalStorage untuk Persistensi Autentikasi
**File:** `auth/AuthContext.js`

**Deskripsi:**
Menyimpan informasi login (misal token atau user object) agar tetap login meskipun halaman di-refresh.

**Contoh Kode: 
```jsx
useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);
```

## 🧩 Struktur Folder

```
books_sys/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── books.js
│   │   ├── db.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── logo manajemen.png
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── auth/
│   │   │   ├── AuthContext.js
│   │   │   └── ProtectedRoute.js
│   │   ├── components/
│   │   │   ├── BookFilter.js
│   │   │   ├── BookForm.js
│   │   │   └── BookList.js
│   │   ├── context/
│   │   │   └── BookContext.js
│   │   ├── hooks/
│   │   │   └── useBookStats.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Stats.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
└── README.md
```

## 📌 Ketentuan Proyek
- ✅ Proyek individu
- ✅ Versi kontrol menggunakan Git & GitHub
- ✅ Minimal 3 commit/minggu
- ✅ CRUD untuk 2 entitas (User & Book)
- ✅ Database PostgreSQL
- ✅ Backend dengan Pyramid & RESTful API
- ✅ Frontend dengan React JS (Router, Context, Tailwind)
- ✅ README.md lengkap
- ✅ Link GitHub dicantumkan di presentasi
