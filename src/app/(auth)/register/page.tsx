"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError(""); // reset error saat user mulai mengetik
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi kosong
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Semua field wajib diisi.");
      return;
    }

    // Validasi email dengan regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Format email tidak valid.");
      return;
    }

    // Validasi password
    if (form.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    // Cek apakah email sudah ada
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const isExist = users.find((user: any) => user.email === form.email);
    if (isExist) {
      setError("Email sudah terdaftar.");
      return;
    }

    // Simpan user baru
    const newUsers = [...users, form];
    localStorage.setItem("users", JSON.stringify(newUsers));

    router.push("/login");
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-blue-400 mt-2 font-medium">Join us today and get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-blue-50/50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400 text-blue-900"
              />
            </div>

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
              Create Account
            </button>
          </form>

          {/* Login link */}
          <div className="text-center mt-8">
            <p className="text-blue-600 font-medium">
              Already have an account?{" "}
              <a 
                href="/login" 
                className="text-blue-700 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-4 hover:decoration-blue-800 transition-colors"
              >
                Sign In
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