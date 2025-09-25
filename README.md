# 📝 Mini Blog dengan Next.js 15 + TailwindCSS + TypeScript

Proyek ini adalah aplikasi mini blog menggunakan **Next.js 15 (App Router)**, **TailwindCSS**, dan **TypeScript**.  
Fitur utama:
- Register & Login (tanpa database, hanya menggunakan `localStorage`)
- Proteksi halaman utama (redirect ke login jika belum login)
- Navbar dengan tab **Reading** & **Start Writing**
- **Reading**: daftar tulisan dari semua user
- **Detail Post**: menampilkan tulisan secara penuh
- **Start Writing**: membuat tulisan baru, otomatis muncul di Reading
- Data user & postingan disimpan di **localStorage**

---

## 📂 Struktur Folder
app/
├─ (auth)/ # Halaman autentikasi
│ ├─ layout.tsx # Layout khusus auth (tema biru putih)
│ ├─ login/page.tsx # Halaman login
│ └─ register/page.tsx# Halaman register
│
├─ (main)/ # Halaman utama (setelah login)
│ ├─ layout.tsx # Layout dengan navbar
│ ├─ reading/ # Tab Reading
│ │ ├─ page.tsx # List postingan
│ │ └─ [id]/page.tsx# Detail postingan
│ └─ start-writing/ # Tab Start Writing
│ └─ page.tsx # Form membuat postingan baru
│
├─ globals.css # Global styling (Tailwind sudah aktif)
└─ layout.tsx # Root layout Next.js


---

## 🚀 Cara Menjalankan
1. Clone repo ini & install dependencies
   ```bash
   npm install
   # atau
   yarn install

2. Jalankan development server
    npm run dev
3. Aplikasi tersedia di http://localhost:3000