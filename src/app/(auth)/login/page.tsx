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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
      <div className="absolute top-20 right-10 w-24 h-24 bg-blue-300 rounded-full opacity-15"></div>
      <div className="absolute bottom-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 rounded-full opacity-20 translate-x-20 translate-y-20"></div>
      
      {/* Main card */}
      <div className="w-full max-w-md relative">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8 relative z-10">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-blue-400 mt-2 font-medium">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-blue-50/50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400 text-blue-900"
              />
            </div>

            {/* Password input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-blue-50/50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400 text-blue-900"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          {/* Register link */}
          <div className="text-center mt-8">
            <p className="text-blue-600 font-medium">
              Don't have an account?{" "}
              <a 
                href="/register" 
                className="text-blue-700 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-4 hover:decoration-blue-800 transition-colors"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Decorative card shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl blur-xl opacity-20 -z-10 transform scale-105"></div>
      </div>
    </div>
  );
}