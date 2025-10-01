'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p className="text-center mt-8 text-gray-700">Loading user data...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Welcome to Product Management</h1>
      {isAuthenticated ? (
        <div className="text-center">
          <p className="text-xl mb-4">Hello, {user?.username} ({user?.role})!</p>
          <p className="mb-8">Manage your products efficiently.</p>
          <Link href="/products" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
            Go to Products
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-4">Please log in to continue.</p>
          <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}