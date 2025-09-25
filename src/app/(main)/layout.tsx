"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full opacity-10 -translate-x-16 -translate-y-16"></div>
      <div className="absolute top-20 right-10 w-24 h-24 bg-blue-300 rounded-full opacity-8"></div>
      <div className="absolute bottom-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-6"></div>
      
      {/* Navbar */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-blue-200/50 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 gap-4 sm:gap-0">
          
          {/* Mobile: Top row with logo and user info */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group transition-all duration-200 hover:scale-105" 
              onClick={() => router.push("/")}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MyApp
              </span>
            </div>

            {/* Mobile: User Info and Logout - Right side on mobile */}
            <div className="flex sm:hidden items-center space-x-2">
              {/* User Avatar only on mobile */}
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              
              {/* Mobile Logout Button - Icon only */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 transition-all duration-200 group"
                title="Logout"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Tabs - Full width on mobile */}
          <div className="flex items-center justify-center w-full sm:w-auto space-x-1 sm:space-x-2">
            <Link href="/reading" className="group flex-1 sm:flex-none">
              <div className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-xl text-blue-600 hover:bg-blue-100/70 transition-all duration-200 font-medium">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="text-sm sm:text-base">Reading</span>
              </div>
            </Link>
            <Link href="/start-writing" className="group flex-1 sm:flex-none">
              <div className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm sm:text-base">Start Writing</span>
              </div>
            </Link>
          </div>

          {/* Desktop: User Info and Logout - Hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="font-medium text-blue-700">
                {user?.name || "User"}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 transition-all duration-200 font-medium group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}