// components/Navbar.tsx

'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false, // Evita la redirección automática
      callbackUrl: '/auth/signin', // URL a la que se redirige después de cerrar sesión
    });
    router.push('/auth/signin'); // Redirección manual
  };

  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar className="flex justify-between">
        {/* Izquierda: Logo o Nombre de la App */}
        <div className="flex items-center">
          <IconButton edge="start" color="inherit" aria-label="menu" className="mr-2">
            <MenuIcon />
          </IconButton>
          <Link href="/dashboard">
              <Typography variant="h6" component="div">
                Dashboard
              </Typography>
          </Link>
        </div>

        {/* Derecha: Información del Usuario y Botón de Logout */}
        <div className="flex items-center">
          {status === 'authenticated' ? (
            <>
              <Typography variant="body1" className="mr-4">
                Hola, {session.user.name}
              </Typography>
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <a>
                <Button color="inherit">Login</Button>
              </a>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
