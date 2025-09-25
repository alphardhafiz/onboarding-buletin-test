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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 md:mb-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Reading
            </h1>
            <p className="text-blue-500 font-medium mt-1 text-sm md:text-base">Discover amazing stories</p>
          </div>
        </div>
        
        {posts.length > 0 && (
          <div className="bg-blue-50/50 rounded-2xl px-4 py-3 border border-blue-200/50">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p className="font-semibold text-blue-800">{posts.length} articles available</p>
                <p className="text-blue-600 text-sm">Stay updated with the latest posts</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Posts Section */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-blue-800 mb-2">No Articles Yet</h3>
          <p className="text-blue-600 mb-6 text-sm max-w-sm mx-auto">
            Start writing to see your content here!
          </p>
          <Link 
            href="/start-writing" 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Write Your First Article</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-5 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl"></div>
              
              {/* Post number - hidden on mobile, shown on desktop */}
              <div className="hidden md:flex absolute top-6 right-6 w-8 h-8 bg-blue-100 rounded-full items-center justify-center text-blue-600 font-semibold text-sm">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Post content */}
              <div className="md:pr-12">
                <Link href={`/reading/${post.id}`}>
                  <h2 className="text-lg md:text-2xl font-bold text-blue-800 mb-3 group-hover:text-blue-900 transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-blue-700/80 leading-relaxed mb-4 text-sm md:text-lg line-clamp-2 md:line-clamp-3">
                  {post.content}
                </p>

                {/* Author and metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md shrink-0">
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-blue-800 text-sm md:text-base truncate">{post.author}</p>
                      <div className="flex items-center space-x-3 text-xs md:text-sm text-blue-500">
                        <span className="truncate">{formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span className="shrink-0">{getReadingTime(post.content)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/reading/${post.id}`}
                    className="ml-4 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors font-medium text-blue-600 hover:text-blue-700 text-sm shrink-0"
                  >
                    Read
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}