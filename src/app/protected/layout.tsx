// app/dashboard/layout.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
  role: string;
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = getCookie('auth');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as JWTPayload;
        setRole(decoded.role);
      } catch (error) {
        console.error('Token inválido:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default DashboardLayout;
