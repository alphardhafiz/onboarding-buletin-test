// app/(main)/start-writing/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function StartWritingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Judul dan konten tidak boleh kosong.");
      return;
    }

    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      setError("Anda harus login terlebih dahulu.");
      return;
    }
    const user = JSON.parse(currentUser);

    const storedPosts = localStorage.getItem("posts");
    const posts: Post[] = storedPosts ? JSON.parse(storedPosts) : [];

    const newPost: Post = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title,
      content,
      author: user.name,
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    router.push("/reading");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Start Writing</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan judul tulisan"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Konten</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tulis isi konten di sini..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Posting
        </button>
      </form>
    </div>
  );
}
