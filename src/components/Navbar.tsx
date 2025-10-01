'use client';

import Link from 'next/link';
import { useAuth, UserRole } from '@/context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user, hasRole } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Product App
        </Link>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {user && <span className="text-sm">Welcome, {user.username} ({user.role})</span>}
              <Link href="/products" className="hover:text-gray-300">
                Products
              </Link>
              {hasRole([UserRole.ADMIN]) && (
                <Link href="/audit" className="hover:text-gray-300">
                  Audit Log
                </Link>
              )}
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="hover:text-gray-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;