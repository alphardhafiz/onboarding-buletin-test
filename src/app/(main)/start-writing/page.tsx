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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty.");
      setIsSubmitting(false);
      return;
    }

    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      setError("You must be logged in first.");
      setIsSubmitting(false);
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

    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    router.push("/reading");
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = getWordCount(text);
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Start Writing
            </h1>
            <p className="text-blue-500 font-medium mt-1">Share your thoughts with the world</p>
          </div>
        </div>
      </div>

      {/* Writing Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-blue-200/50 shadow-xl overflow-hidden">
        {/* Decorative header */}
        <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
        
        <div className="p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <svg className="h-6 w-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Title Input */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-blue-800 font-semibold text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                </svg>
                <span>Article Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                className="w-full px-6 py-4 bg-blue-50/50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400 text-blue-900 text-xl font-medium"
                placeholder="Enter an engaging title for your article..."
              />
              <div className="flex items-center justify-between text-sm">
                <p className="text-blue-600">
                  {title.length > 0 && (
                    <span className="font-medium">{title.length} characters</span>
                  )}
                </p>
                <p className="text-blue-500">
                  {title.length > 60 && (
                    <span className="text-amber-600">Consider a shorter title for better readability</span>
                  )}
                </p>
              </div>
            </div>

            {/* Content Input */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-blue-800 font-semibold text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Content</span>
              </label>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setError("");
                  }}
                  className="w-full px-6 py-6 bg-blue-50/50 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-blue-400 text-blue-900 text-lg leading-relaxed resize-none"
                  rows={12}
                  placeholder="Start writing your amazing content here... Share your thoughts, experiences, or knowledge with your readers."
                />
                
                {/* Writing stats */}
                {content.length > 0 && (
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-blue-200/50">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-blue-600 font-medium">{getWordCount(content)} words</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-blue-600 font-medium">{getReadingTime(content)} min read</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <p className="text-blue-600">
                  {content.length > 0 && (
                    <span className="font-medium">{content.length} characters</span>
                  )}
                </p>
                <p className="text-blue-500">
                  {getWordCount(content) < 100 && content.length > 0 && (
                    <span className="text-amber-600">Consider writing at least 100 words for better engagement</span>
                  )}
                </p>
              </div>
            </div>

            {/* Submit Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-blue-200/50">
              <div className="flex items-center space-x-4 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Your article will be published immediately</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => router.push("/reading")}
                  className="px-6 py-3 bg-white hover:bg-blue-50 border border-blue-200 text-blue-600 font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="relative px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-300 disabled:to-blue-400 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Publish Article</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}