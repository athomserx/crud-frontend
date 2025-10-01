import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: 'Product CRUD App',
  description: 'Fullstack Product CRUD Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
            <Navbar />
            <main className="container mx-auto p-4">
              {children}
            </main>
          </AuthProvider>
      </body>
    </html>
  );
}