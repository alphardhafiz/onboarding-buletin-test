"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError(""); // reset error kalau user mulai mengetik
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi kosong
    if (!form.email.trim() || !form.password.trim()) {
      setError("Email dan password wajib diisi.");
      return;
    }

    // Validasi email dengan regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Format email tidak valid.");
      return;
    }

    // Ambil semua user dari localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Cari user berdasarkan email + password
    const user = users.find(
      (u: any) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      setError("Email atau password salah.");
      return;
    }

    // Simpan token + user aktif
    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem("currentUser", JSON.stringify(user));
    const mockPosts = [
      {
        id: 1,
        title: "Belajar Next.js 15 dari Nol",
        content:
          "Hari ini saya mulai belajar Next.js 15. Struktur foldernya agak berbeda dengan versi sebelumnya, tapi terasa lebih rapi.",
        author: "Andi",
        createdAt: "2025-09-20T08:15:00.000Z",
      },
      {
        id: 2,
        title: "Tips Membuat UI Minimalis dengan TailwindCSS",
        content:
          "Gunakan warna terbatas (misalnya biru dan putih) agar fokus pembaca tidak teralihkan. Perhatikan juga white space.",
        author: "Budi",
        createdAt: "2025-09-21T10:30:00.000Z",
      },
      {
        id: 3,
        title: "Kenapa Harus TypeScript?",
        content:
          "TypeScript membantu mendeteksi error lebih awal. Walaupun awalnya agak ribet, tapi ke depannya lebih aman.",
        author: "Citra",
        createdAt: "2025-09-22T14:45:00.000Z",
      },
      {
        id: 4,
        title: "Perbandingan Next.js dan Remix",
        content:
          "Next.js lebih populer dengan dokumentasi lengkap, tapi Remix unggul di sisi data loading. Keduanya punya kelebihan masing-masing.",
        author: "Dewi",
        createdAt: "2025-09-23T09:20:00.000Z",
      },
      {
        id: 5,
        title: "Menulis API CRUD dengan Prisma",
        content:
          "Prisma memudahkan pembuatan model dan query database. Saya baru coba dengan PostgreSQL dan hasilnya cepat sekali.",
        author: "Eka",
        createdAt: "2025-09-23T16:50:00.000Z",
      },
      {
        id: 6,
        title: "Cara Mengatur Auth di Next.js",
        content:
          "Saya menggunakan Context API untuk menyimpan token di localStorage, lalu membuat custom hook `useAuth` untuk akses cepat.",
        author: "Fajar",
        createdAt: "2025-09-24T11:10:00.000Z",
      },
      {
        id: 7,
        title: "Membuat Dark Mode di Tailwind",
        content:
          "Tailwind mendukung dark mode dengan class `dark:`. Cukup tambahkan toggle untuk menambahkan class `dark` ke body.",
        author: "Gita",
        createdAt: "2025-09-24T19:00:00.000Z",
      },
      {
        id: 8,
        title: "Mengenal React Hook Form",
        content:
          "React Hook Form ringan dan cepat. Validasi bisa pakai Yup resolver, sangat berguna untuk form kompleks.",
        author: "Hadi",
        createdAt: "2025-09-25T07:30:00.000Z",
      },
      {
        id: 9,
        title: "Pengalaman Pertama Deploy ke Vercel",
        content:
          "Deploy Next.js ke Vercel hanya butuh beberapa klik. Setelah connect ke GitHub, langsung otomatis build dan online.",
        author: "Indah",
        createdAt: "2025-09-25T12:00:00.000Z",
      },
      {
        id: 10,
        title: "Membuat Blog dengan Next.js",
        content:
          "Saya berhasil membuat blog sederhana dengan Next.js, Tailwind, dan localStorage untuk menyimpan data sementara.",
        author: "Joko",
        createdAt: "2025-09-25T17:40:00.000Z",
      },
    ];

    localStorage.setItem("posts", JSON.stringify(mockPosts));
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
