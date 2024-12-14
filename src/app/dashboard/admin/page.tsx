// app/dashboard/admin/page.tsx
"use client";

import RequireRole from "@/components/RequireRole";

export default function AdminDashboard() {
  return (
    <RequireRole requiredRoles={[1, 2]} >
      <div>
        <h1>Panel de Administración</h1>
        <p>Solo superadmins (1) y admins (2) pueden ver esto.</p>
      </div>
    </RequireRole>
  );
}
