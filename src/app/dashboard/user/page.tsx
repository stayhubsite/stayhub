// app/dashboard/user/page.tsx
"use client";

import RequireRole from "@/components/RequireRole";

export default function UserDashboard() {
  return (
    <RequireRole requiredRoles={[1, 2, 3]}>
      <div>
        <h1>Panel de Usuario</h1>
        <p>Aquí pueden acceder todos los roles autenticados: superadmin, admin y user.</p>
      </div>
    </RequireRole>
  );
}
