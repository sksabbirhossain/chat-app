import Link from "next/link";

export const metadata = {
  title: "404 Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex h-full min-h-screen w-full items-center justify-center bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <section className="p-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white shadow-lg">
          {/* Minimal emblem (simple broken link icon) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-8 w-8"
          >
            <path
              fill="currentColor"
              d="M10.59 13.41a1 1 0 0 0 1.41 0l3-3a1 1 0 0 0-1.41-1.41L11 11.59 9.7 10.3A4 4 0 0 0 6 6.7 1 1 0 0 0 4.6 8.1a6 6 0 0 1 3.1 3.9l1.9 1.41zM13 12.41l1.3 1.3A4 4 0 0 0 18 17.3a1 1 0 0 0 1.4-1.4 6 6 0 0 1-3.1-3.9L13 12.41z"
            />
          </svg>
        </div>

        <p className="text-sm font-semibold tracking-wide text-green-600 uppercase">
          Error
        </p>
        <h1 className="mt-2 text-6xl font-extrabold text-slate-900">404</h1>
        <h1 className="text-2xl font-semibold text-slate-900">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-lg text-slate-600">
          Sorry — the page you were looking for doesn&apos;t exist. It might
          have been moved or removed.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            Home
          </Link>

          <a
            href="mailto:support@example.com"
            className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Contact support
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          If you think this is a mistake, reach out and we&apos;ll help you find
          what you&apos;re after.
        </p>
      </section>
    </main>
  );
}
