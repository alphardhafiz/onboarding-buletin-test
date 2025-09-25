// app/(main)/reading/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function ReadingPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const parsed: Post[] = JSON.parse(storedPosts);
      const sorted = parsed.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPosts(sorted);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Reading</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">Belum ada tulisan.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <Link href={`/reading/${post.id}`}>
              <h2 className="text-xl font-semibold text-blue-700 hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-700 mt-2 line-clamp-2">{post.content}</p>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span>Ditulis oleh: {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
