// app/dashboard/superadmin/page.tsx
"use client";

import RequireRole from "@/components/RequireRole";

export default function SuperAdminDashboard() {
  return (
    <RequireRole requiredRoles={[1]}>
      <div>
        <h1>Panel de Súper Administración</h1>
        <p>Solo el súper administrador (1) puede ver esto.</p>
      </div>
    </RequireRole>
  );
}
