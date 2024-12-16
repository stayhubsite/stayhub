"use client";
import { useState } from "react"; // Importa el hook useState de React para manejar el estado.
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { motion } from "framer-motion"; // Importa la librería framer-motion para animaciones.

interface LoginFormData {
  email: string;
  password: string;
}
interface RegisterFormData {
  email: string;
  password: string;
  name?: string;
}

export default function AuthForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formDatar, setFormDatar] = useState<RegisterFormData>({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setFormDatar((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

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

  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");


    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDatar),
      });

      const data = await res.json();

      if (res.ok) {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setError(data.message || "Error en el registro.");
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("Error en el registro.");
    }
  };

  const [isFlipped, setIsFlipped] = useState(false); // Declara el estado isFlipped para saber si el formulario está volteado o no.

  const toggleForm = () => setIsFlipped(!isFlipped); // Función que invierte el valor de isFlipped para cambiar entre los formularios de Login y Registro.

  return (
    <div className="w-full max-w-lg mx-auto perspective sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      {/* Este contenedor centraliza el formulario en la pantalla y ajusta su tamaño dependiendo de la resolución */}
      <motion.div
        className="w-full h-[550px] w-full w-[300px]  [transform-style:preserve-3d] cursor-pointer sm:h-[550px] lg:h-[600px]"
        animate={{ rotateY: isFlipped ? 180 : 0 }} // Aplica una animación de rotación en el eje Y al contenedor de los formularios.
        transition={{ duration: 0.9, ease: "easeInOut" }} // Configura la duración de la animación y el tipo de transición.
      >
        {/* Lado de Login */}
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-500">
                Iniciar Sesión
              </h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Formulario de Login */}
                <div>
                  <label htmlFor="loginEmail" className="text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="loginPassword" className="text-gray-700">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                  Iniciar Sesión
                </button>
              </form>
            </div>
            <p className="text-center text-sm text-gray-600">
              {/* Mensaje para redirigir al usuario a la página de registro */}
              ¿No tienes una cuenta?
              <button
                onClick={toggleForm} // Al hacer clic, cambia el estado de isFlipped, lo que invierte la animación.
                className="ml-1 text-blue-500 hover:underline focus:outline-none"
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>

        {/* Lado de Registro */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-500">
                Registrarse
              </h2>
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formDatar.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Opcional"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formDatar.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="tu-email@ejemplo.com"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-2"
                  >
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formDatar.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Tu contraseña"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Registrarse
                </button>
              </form>
            </div>
            <p className="text-center text-sm text-gray-600">
              {/* Mensaje para redirigir al usuario a la página de inicio de sesión */}
              ¿Ya tienes una cuenta?
              <button
                onClick={toggleForm} // Al hacer clic, cambia el estado de isFlipped para regresar al formulario de login.
                className="ml-1 text-indigo-600 hover:underline focus:outline-none"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
