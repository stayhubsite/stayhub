"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ModalRL() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<"initial" | "register" | "login">(
    "initial"
  );

  const handleOpen = () => {
    setStep("initial");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStep("initial"); // Reinicia a la vista inicial
  };

  const handleRegisterClick = () => {
    setStep("register");
  };

  const handleLoginClick = () => {
    setStep("login");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Ingresa</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {step === "initial" && (
            <>
              <h2 id="modal-title">Bienvenido</h2>
              <p id="modal-description">
                Selecciona una opción para continuar.
              </p>
              <Button onClick={handleRegisterClick} sx={{ m: 1 }}>
                Registro
              </Button>
              <Button onClick={handleLoginClick} sx={{ m: 1 }}>
                Login
              </Button>
            </>
          )}
          {step === "register" && (
            <>
              <h2 id="modal-title">Registro</h2>
              <p id="modal-description">
                Por favor, completa tus datos para registrarte.
              </p>
              {/* Aquí puedes agregar un formulario de registro */}
              <Button onClick={handleClose}>Cerrar</Button>
            </>
          )}
          {step === "login" && (
            <>
              <h2 id="modal-title">Login</h2>
              <p id="modal-description">
                Ingresa tus credenciales para acceder.
              </p>
              {/* Aquí puedes agregar un formulario de login */}
              <Button onClick={handleClose}>Cerrar</Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
