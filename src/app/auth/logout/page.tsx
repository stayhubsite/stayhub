// app/auth/logout/page.tsx

'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Typography } from '@mui/material';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      await signOut({
        redirect: false,
        callbackUrl: '/auth/signin',
      });
      router.push('/auth/signin');
    };

    performLogout();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <CircularProgress />
      <Typography variant="h6" className="mt-4">
        Cerrando sesión...
      </Typography>
    </div>
  );
};

export default Logout;
