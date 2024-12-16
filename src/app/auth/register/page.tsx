// app/auth/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [roleId] = useState<number>(3); // Por defecto 'user' (3)
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, roleId }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Error al registrar el usuario");
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    }
  };

  return (
    <div>
      <h1>Registrarse</h1>
      {success ? (
        <p>Registro exitoso. Redirigiendo al inicio de sesión...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Opcional: Selector de Roles si es necesario */}
          {/* <div>
            <label>Rol</label>
            <select value={roleId} onChange={(e) => setRoleId(Number(e.target.value))}>
              <option value={1}>Superadmin</option>
              <option value={2}>Admin</option>
              <option value={3}>User</option>
            </select>
          </div> */}
          <button type="submit">Registrarse</button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
