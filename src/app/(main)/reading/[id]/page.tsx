// app/(main)/reading/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const posts: Post[] = JSON.parse(storedPosts);
      const found = posts.find((p) => p.id === Number(id));
      if (found) {
        setPost(found);
      }
    }
  }, [id]);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-500">Tulisan tidak ditemukan.</p>
        <button
          onClick={() => router.push("/reading")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-blue-700">{post.title}</h1>
      <p className="text-sm text-gray-500">
        Ditulis oleh: {post.author} ·{" "}
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <p className="text-gray-800 leading-relaxed">{post.content}</p>

      {/* Tombol kembali selalu muncul */}
      <button
        onClick={() => router.push("/reading")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Kembali ke Reading
      </button>
    </div>
  );
}
