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
   git clone https://github.com/rizkiadrianbennovry/RizkiAdrianBennovry_121450073_pertemuan3.git
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
| ![image](https://github.com/user-attachments/assets/710ad868-fcc8-4d96-86d9-e4e72f9a81c7) | ![image](https://github.com/user-attachments/assets/e45af8e7-05ed-4e40-a161-3f9a80dd13a8) |

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

## 🧩 Struktur Folder

```
src/
├── components/
│   ├── BookFilter/
│   │   └── BookFilter.js
│   ├── BookForm/
│   │   ├── BookForm.js
│   │   └── BookForm.test.js
│   └── BookList/
│       └── BookList.js
├── context/
│   └── BookContext.js
├── hooks/
│   ├── useBookStats.js
│   └── useLocalStorage.js
├── pages/
│   ├── Home/
│   │   └── Home.js
│   └── Stats/
│       └── Stats.js
├── App.js
├── index.js
└── index.css

```
