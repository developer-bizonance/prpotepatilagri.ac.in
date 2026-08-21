import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 text-white text-center p-6">
      <h1 className="text-7xl font-bold text-orange-500">404</h1>
      <p className="text-2xl mt-4 text-gray-500">Oops! Page not found</p>
      <p className="mt-2 text-lg text-gray-500">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 text-sm bg-gradient-to-br from-orange-300 to-orange-500 font-semibold rounded-lg shadow hover:bg-orange-100 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
