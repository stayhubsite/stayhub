"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthForm() {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleForm = () => setIsFlipped(!isFlipped);

  return (
    <div className="w-full max-w-lg mx-auto perspective sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      {/* Usamos mx-auto para centrar el componente horizontalmente */}
      <motion.div
        className="w-full h-[550px] w-full w-[300px]  [transform-style:preserve-3d] cursor-pointer sm:h-[550px] lg:h-[600px]" 
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        {/* Login Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-500">
                Iniciar Sesión
              </h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="loginEmail" className="text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
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
                    id="loginPassword"
                    placeholder="************"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                  Iniciar Sesión
                </button>
              </form>
            </div>
            <p className="text-center text-sm text-gray-600">
              ¿No tienes una cuenta?
              <button
                onClick={toggleForm}
                className="ml-1 text-blue-500 hover:underline focus:outline-none"
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>

        {/* Register Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-500">
                Registrarse
              </h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="registerEmail" className="text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="registerEmail"
                    placeholder="tu@email.com"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="registerPassword" className="text-gray-700">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="registerPassword"
                    placeholder="********"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="text-gray-700">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="********"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-600 transition">
                  Registrarse
                </button>
              </form>
            </div>
            <p className="text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?
              <button
                onClick={toggleForm}
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
