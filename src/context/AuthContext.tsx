'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export enum UserRole {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  VIEWER = 'viewer',
}

interface User {
  id: number;
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromStorage = () => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          try {
            const parsedUser: User = JSON.parse(storedUser);
            setToken(storedToken);
            setUser(parsedUser);
          } catch (error) {
            console.error('Failed to parse user from localStorage', error);
            clearAuthData();
          }
        }
      }
      setIsLoading(false);
    };

    loadUserFromStorage();
  }, []);

  const clearAuthData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setToken(null);
    setUser(null);
  };

  const login = (newToken: string, userData: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
    }
    setToken(newToken);
    setUser(userData);
    router.push('/');
  };

  const logout = () => {
    clearAuthData();
    router.push('/login');
  };

  const isAuthenticated = !!token && !!user;
  const hasRole = (roles: UserRole[]) => isAuthenticated && user ? roles.includes(user.role) : false;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, hasRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};