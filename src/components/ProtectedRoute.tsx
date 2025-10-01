'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (roles && !hasRole(roles)) {
        router.push('/');
        alert('You do not have permission to view this page.');
      }
    }
  }, [isAuthenticated, isLoading, router, roles, hasRole]);

  if (isLoading || !isAuthenticated || (roles && !hasRole(roles))) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;