// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { motion } from "framer-motion";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const toggleForm = () => setIsFlipped(!isFlipped);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = formData;

    const response = await loginUser(email, password);

    if (response.role) {
      // Dependiendo del rol, redirigir a la ruta específica
      switch (response.role) {
        case "superadmin":
          router.push("/dashboard/superadmin");
          break;
        case "admin":
          router.push("/dashboard/admin");
          break;
        case "user":
          router.push("/dashboard/user");
          break;
        default:
          router.push("/dashboard");
          break;
      }
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="w-full h-[450px] [transform-style:preserve-3d] cursor-pointer"
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="tu-email@ejemplo.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Contraseña *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Tu contraseña"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Iniciando..." : "Entrar"}
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={toggleForm}
            className="ml-1 text-indigo-600 hover:underline focus:outline-none"
          >
            Regístrate
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
