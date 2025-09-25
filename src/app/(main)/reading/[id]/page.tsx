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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const posts: Post[] = JSON.parse(storedPosts);
      const found = posts.find((p) => p.id === Number(id));
      if (found) {
        setPost(found);
      }
    }
    setLoading(false);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
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

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="text-blue-800/90 leading-relaxed text-base md:text-lg mb-4 md:mb-6">
        {paragraph}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          {/* Back button skeleton */}
          <div className="w-28 h-10 bg-blue-200 rounded-2xl"></div>
          
          {/* Article skeleton */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 md:p-8 border border-blue-200/50">
            <div className="h-6 md:h-8 bg-blue-200 rounded-xl mb-4 w-4/5"></div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-200 rounded-xl shrink-0"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-200 rounded w-24"></div>
                <div className="h-3 bg-blue-200 rounded w-32"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-blue-200 rounded w-full"></div>
              <div className="h-4 bg-blue-200 rounded w-5/6"></div>
              <div className="h-4 bg-blue-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/reading")}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm hover:bg-blue-50 border border-blue-200 px-4 py-2 rounded-2xl transition-all duration-200 font-medium text-blue-700 hover:text-blue-800 shadow-lg hover:shadow-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>
        </div>

        {/* Not found state */}
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Article Not Found</h3>
          <p className="text-red-500 text-sm max-w-sm mx-auto">
            The article you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/reading")}
          className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm hover:bg-blue-50 border border-blue-200 px-4 py-2 rounded-2xl transition-all duration-200 font-medium text-blue-700 hover:text-blue-800 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* Article content */}
      <article className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 shadow-xl">
        {/* Decorative header */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-t-2xl"></div>
        
        <div className="p-5 md:p-8 lg:p-12">
          {/* Article header */}
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent leading-tight mb-6">
              {post.title}
            </h1>
            
            {/* Author and metadata */}
            <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg shrink-0">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-blue-800 text-sm md:text-lg truncate">{post.author}</p>
                  <p className="text-blue-600 text-xs md:text-sm">{formatDate(post.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 md:px-4 md:py-2 rounded-xl">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-blue-700 font-medium text-xs md:text-sm">{getReadingTime(post.content)}</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 md:px-4 md:py-2 rounded-xl">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="text-blue-700 font-medium text-xs md:text-sm">{post.content.split(' ').length} words</span>
                </div>
              </div>
            </div>
          </header>

          {/* Article content */}
          <div className="prose prose-sm md:prose-lg max-w-none">
            {formatContent(post.content)}
          </div>
        </div>
      </article>

      {/* Bottom navigation */}
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push("/reading")}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to All Articles</span>
        </button>
      </div>
    </div>
  );
}