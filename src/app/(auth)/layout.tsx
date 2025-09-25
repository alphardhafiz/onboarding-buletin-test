// app/(auth)/layout.tsx

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // This is a *server* layout component (no "use client").
  // Keep it presentational — any client-side interactivity (forms, localStorage) will go inside client components in the pages.

  return (
    <div className="min-h-screen flex bg-white">
      {/* left panel only visible on md+ — simple blue branding */}
      <aside className="hidden md:flex md:w-1/3 bg-blue-600 items-center justify-center p-8 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">MyApp</h1>
          <p className="mt-2 text-sm opacity-90">Singkat & minimal — biru-putih</p>
        </div>
      </aside>

      {/* right: centered card for auth forms */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          {children}
        </div>
      </main>
    </div>
  );
}
