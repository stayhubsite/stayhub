// app/dashboard/page.tsx
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Bienvenido al Dashboard</h2>
      <p>Esta es una página protegida solo para usuarios autenticados.</p>
      {/* Agrega más contenido aquí según tus necesidades */}
    </div>
  );
};

export default DashboardPage;
