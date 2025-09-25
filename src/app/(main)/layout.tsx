// app/(main)/layout.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showMenu, setShowMenu] = useState(false);

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
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-blue-600 text-white">
        {/* Left: Logo */}
        <div className="font-bold text-lg cursor-pointer" onClick={() => router.push("/")}>MyApp</div>

        {/* Middle: Tabs */}
        <div className="space-x-6">
          <Link href="/reading" className="hover:underline">
            Reading
          </Link>
          <Link href="/start-writing" className="hover:underline">
            Start Writing
          </Link>
        </div>

        {/* Right: User */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="font-medium hover:underline"
          >
            {user?.name || "User"}
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-md">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}