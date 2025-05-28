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
3. Setup database PostgreSQL dan sesuaikan .env jika diperlukan.

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

## 🖼 Screenshot

| Tampilan Utama | Statistik |
|----------------|-----------|
| ![image](https://github.com/user-attachments/assets/86408ff7-2ae5-4f97-b037-c0fc88a85dea) | ![image](https://github.com/user-attachments/assets/e31ec84c-b442-450e-9272-e34854a46f81) |

| Halaman Login | Halaman Register |
|---------------|------------------|
| ![image](https://github.com/user-attachments/assets/0d498734-e451-48d2-9262-d125e2a89d9b) | ![image](https://github.com/user-attachments/assets/3ab17209-b536-40e7-87dc-6e186ed595be) |

## ⚛️ Fitur React yang Digunakan

### ✅ Hooks
Digunakan untuk mengelola state dan efek samping (side effect) tanpa class component.
```jsx
// Contoh penggunaan useState dan useEffect
const [books, setBooks] = useState([]);

useEffect(() => {
  const saved = localStorage.getItem('books');
  if (saved) setBooks(JSON.parse(saved));
}, []);
```

### ✅ Context API
Untuk manajemen state global tanpa perlu Redux. Memudahkan akses data antar komponen.
```jsx
// BookContext.js
export const BookContext = createContext();

function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);
  // ... fungsi add, edit, delete
  return (
    <BookContext.Provider value={{ books, addBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}
```

### ✅ Custom Hooks
Membuat logika yang bisa digunakan kembali, seperti pengelolaan localStorage atau menghitung statistik.
```jsx
// useLocalStorage.js
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

## 📝 Komentar Kode Penting
Berikut penjelasan untuk bagian kode yang penting agar mudah dipahami saat membaca atau mengembangkan ulang aplikasinya:
```jsx
// BookForm.js
const handleSubmit = (e) => {
  e.preventDefault();
  if (!form.title.trim() || !form.author.trim()) {
    setError('Judul dan penulis wajib diisi!'); // Validasi input
    return;
  }
  // Logika submit buku...
};
```

```jsx
// BookList.js
{filteredBooks.map(book => (
  <BookItem 
    key={book.id} // Penting untuk performa React
    book={book} 
    onDelete={deleteBook}
  />
))}
```

## ✅ Laporan Testing

### Unit Test (React Testing Library)
Untuk memastikan aplikasi berjalan dengan benar, dilakukan unit testing dengan React Testing Library.
```jsx
// BookForm.test.js
test('menampilkan error ketika submit form kosong', () => {
  render(<BookForm />);
  fireEvent.click(screen.getByText(/tambah buku/i));
  expect(screen.getByText(/wajib diisi/i)).toBeInTheDocument();
});
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
