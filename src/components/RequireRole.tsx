// components/RequireRole.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

type RequireRoleProps = {
  requiredRoles: number[]; // Array de roles permitidos [1,2], etc.
  children: ReactNode;
};

const RequireRole = ({ requiredRoles, children }: RequireRoleProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Mientras se carga la sesión

    if (!session) {
      router.push("/auth/signin");
    } else {
      const userRoleId = session.user.roleId || 3; // Por defecto 'user' (3)
      if (!requiredRoles.includes(userRoleId)) {
        router.push("/unauthorized");
      }
    }
  }, [session, status, router, requiredRoles]);

  if (status === "loading" || !session) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
};

export default RequireRole;
