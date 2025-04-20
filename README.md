# 📚 Manajemen Buku Pribadi

![image](https://github.com/user-attachments/assets/99fb62ac-14da-41da-9233-78e2644da10f)

## 📝 Deskripsi
Aplikasi web untuk mengelola koleksi buku pribadi. Fitur utama:
- Tambah, edit, dan hapus buku
- Filter berdasarkan status: **Milik**, **Dibaca**, dan **Ingin Beli**
- Pencarian buku berdasarkan judul atau penulis
- Statistik koleksi buku
- Penyimpanan data lokal melalui `localStorage`

## 🛠 Teknologi
- [React 18](https://reactjs.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [React Router 6](https://reactrouter.com/)
- Context API
- LocalStorage

## 🚀 Instalasi & Menjalankan

1. Clone repository:
   ```bash
   git clone https://github.com/username/manajemen-buku.git
   cd manajemen-buku
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan aplikasi:
   ```bash
   npm start
   ```
   Akses di browser melalui `http://localhost:3000`

4. Untuk production build:
   ```bash
   npm run build
   ```

## 🖼 Screenshot

| Tampilan Utama | Statistik |
|----------------|-----------|
| ![Home](./screenshots/home.png) | ![Stats](./screenshots/stats.png) |

## ⚛️ Fitur React yang Digunakan

### ✅ Hooks
```jsx
// Contoh penggunaan useState dan useEffect
const [books, setBooks] = useState([]);

useEffect(() => {
  const saved = localStorage.getItem('books');
  if (saved) setBooks(JSON.parse(saved));
}, []);
```

### ✅ Context API
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

```jsx
// BookForm.test.js
test('menampilkan error ketika submit form kosong', () => {
  render(<BookForm />);
  fireEvent.click(screen.getByText(/tambah buku/i));
  expect(screen.getByText(/wajib diisi/i)).toBeInTheDocument();
});
```

### Test Coverage (Contoh Output)

```
---------------------|---------|----------|---------|---------|-------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------|---------|----------|---------|---------|-------------------
All files            |     92  |      85  |     90  |     92  |
  components         |     91  |      83  |     88  |     91  |
    BookForm.js      |     95  |      80  |    100  |     95  | 24
    BookList.js      |     89  |      85  |     85  |     89  | 32-33
---------------------|---------|----------|---------|---------|-------------------
```

## 🧩 Struktur Folder

```
src/
├── components/
│   ├── BookForm.js        # Form tambah/edit buku
│   ├── BookList.js        # Tampilan daftar buku
│   └── BookFilter.js      # Filter dan pencarian buku
├── pages/
│   ├── Home.js            # Halaman utama
│   └── Stats.js           # Statistik koleksi
├── hooks/
│   ├── useLocalStorage.js # Custom hook localStorage
│   └── useBookStats.js    # Custom hook statistik buku
└── context/
    └── BookContext.js     # State management global
```

## 🔒 Environment Variables

Buat file `.env` di root project (jika menggunakan API):
```
REACT_APP_API_URL=http://localhost:3001
```

## 🌐 Deployment

Aplikasi ini dapat diakses melalui Vercel:

👉 [https://manajemen-buku.vercel.app](https://manajemen-buku.vercel.app)

## 📌 Panduan Penyempurnaan

- Simpan semua **screenshot** di folder `./screenshots`
- Jalankan testing dengan:
  ```bash
  npm test -- --coverage
  ```
- Tambahkan komentar untuk:
  - Custom hooks
  - Logika `useEffect` penting
  - Validasi form dan kondisi edge case

## 📜 License

MIT © 2025
```

Kalau kamu butuh bantuan generate `screenshot.png` atau `stats.png` palsu untuk sementara, aku juga bisa bantu. Cukup upload tampilan aplikasi kamu atau minta template-nya!
