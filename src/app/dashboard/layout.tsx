// app/dashboard/layout.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoutButton from '@/components/logout';

interface AuthResponse {
  message: string;
  user?: {
    userId: string;
    role: string;
  };
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ userId: string; role: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data: AuthResponse = await res.json();

        if (res.ok && data.user) {
          setAuthenticated(true);
          setUser(data.user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div>
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Dashboard</h1>
        <div>
          {user && (
            <span className="mr-4">
              Hola, Usuario {user.userId} ({user.role})
            </span>
          )}
          <LogoutButton />
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
