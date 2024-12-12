"use client";

import * as React from "react"; // React para crear el componente
import Box from "@mui/material/Box"; // Caja para el contenido del modal
import Modal from "@mui/material/Modal"; // Componente modal (ventana emergente)
import Button from "@mui/material/Button"; // Botón para interactuar
import LoginPage from "@/app/login/page";
import RegisterPage from "@/app/register/page";

// Aquí definimos cómo se verá el modal (ventana emergente)
// const style = {
//   position: "absolute", // La posición será absoluta dentro de la pantalla
//   top: "50%", // Centrado verticalmente
//   left: "50%", // Centrado horizontalmente
//   transform: "translate(-50%, -50%)", // Ajusta para que quede perfectamente centrado
//   width: 400, // Ancho del modal
//   bgcolor: "background.paper", // Color de fondo del modal
//   border: "2px solid #000", // Borde negro de 2px
//   boxShadow: 24, // Sombra para que se vea "elevado"
//   pt: 2, // Espacio en la parte de arriba (padding top)
//   px: 4, // Espacio a los lados (padding horizontal)
//   pb: 3, // Espacio en la parte de abajo (padding bottom)
// };

// Aquí creamos el componente principal del modal
export default function ModalRL() {
  // Estado que controla si el modal está abierto o cerrado
  const [open, setOpen] = React.useState(false);

  // Estado que controla qué paso se está mostrando: inicio, registro o login
  const [step, setStep] = React.useState<"initial" | "register" | "login">(
    "initial" // Comienza en la vista inicial
  );

  const handleOpen = () => {
    setStep("initial"); // Siempre comenzamos en la vista inicial
    setOpen(true); // Cambiamos el estado para abrir el modal
  };

  const handleClose = () => {
    setOpen(false); // Cerramos el modal
    setStep("initial"); // Reiniciamos la vista a la inicial
  };

  // Función para cambiar a la vista de registro
  const handleRegisterClick = () => {
    setStep("register"); // Cambiamos el paso a registro
  };

  // Función para cambiar a la vista de login
  const handleLoginClick = () => {
    setStep("login"); // Cambiamos el paso a login
  };

  // Lo que se verá en pantalla
  return (
    <div>
      <Button onClick={handleOpen}>Ingresa</Button>

      {/* Modal que aparece cuando el estado `open` es verdadero */}
      <Modal
        open={open}
        onClose={handleClose} // Se cierra cuando haces clic afuera o llamas a esta función
        aria-labelledby="modal-title" // Accesibilidad: título del modal
        aria-describedby="modal-description" // Accesibilidad: descripción del modal
      >
        <Box className="max-w-md w-full bg-white p-6 rounded shadow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Vista inicial: opciones para registro o login */}
          {step === "initial" && (
            <>
              <h2 id="modal-title">Bienvenido</h2>
              <p id="modal-description">
                Selecciona una opción para continuar.
              </p>
              {/* Botones para cambiar de vista */}
              <Button onClick={handleRegisterClick} sx={{ m: 1 }}>
                Registro
              </Button>
              <Button onClick={handleLoginClick} sx={{ m: 1 }}>
                Login
              </Button>
            </>
          )}

          {/* Vista de registro */}
          {step === "register" && (
            <>
              <h2 id="modal-title">Registro</h2>
              <p id="modal-description">
                Por favor, completa tus datos para registrarte.
              </p>
              <RegisterPage />
              <Button onClick={handleClose}>Cerrar</Button>
            </>
          )}

          {/* Vista de login */}
          {step === "login" && (
            <>
              <h2 id="modal-title">Login</h2>
              <p id="modal-description">
                Ingresa tus credenciales para acceder.
              </p>
              <LoginPage />
              <Button onClick={handleClose}>Cerrar</Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
