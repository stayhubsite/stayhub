// app/dashboard/layout.tsx

'use client';

import { SessionProvider } from 'next-auth/react';
import RequireAuth from '@/components/RequireAuth'; // Asegúrate de tener este componente o ajusta según tu implementación
import Navbar from '@/components/NavBarDashboard';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <RequireAuth>
        <Navbar />
        <main className="p-4">{children}</main>
      </RequireAuth>
    </SessionProvider>
  );
};

export default DashboardLayout;
