// Importaciones necesarias para trabajar con React, animaciones y MUI (Material UI)
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Animaciones de framer-motion
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  AvatarGroup,
  IconButton,
  useTheme,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material"; // Componentes de Material UI
import {
  Hotel,
  HomeWork,
  House,
  Apartment,
  Groups,
  More,
  ArrowBack,
  Check,
} from "@mui/icons-material"; // Iconos de Material UI

// Definición de tipos para las propiedades y países
interface PropertyType {
  id: string;
  label: string;
  icon: React.ComponentType;
}

interface Country {
  code: string;
  name: string;
}

// Lista de tipos de propiedades con sus iconos
const propertyTypes: PropertyType[] = [
  { id: "hotel", label: "Hotel", icon: Hotel },
  { id: "bnb", label: "Bed & Breakfast", icon: House },
  { id: "hostel", label: "Hostel", icon: Apartment },
  { id: "vacation", label: "Vacation Rental", icon: HomeWork },
  { id: "groups", label: "Groups", icon: Groups },
  { id: "other", label: "Other", icon: More },
];

// Lista de países para el formulario
const countries: Country[] = [
  { code: "+1", name: "United States" },
  { code: "+58", name: "Venezuela" },
  { code: "+34", name: "Spain" },
  { code: "+33", name: "France" },
  { code: "+49", name: "Germany" },
  // Agrega más países según sea necesario
];

// Definición del tipo para los datos del formulario
interface FormData {
  propertyType: string;
  name: string;
  email: string;
  roomCount: string;
  country: string;
  language: string;
  companyName: string;
  phoneNumber: string;
}

// Componente principal del formulario multi-pasos
export default function MultiStepForm() {
  // Estado para controlar el paso actual del formulario
  const [step, setStep] = useState<number>(0);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    propertyType: "",
    name: "",
    email: "",
    roomCount: "",
    country: "",
    language: "",
    companyName: "",
    phoneNumber: "",
  });

  // Estado para controlar el estado de carga (loading)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado para manejar mensajes de error
  const [error, setError] = useState<string>("");

  // Usamos el tema de MUI
  const theme = useTheme();

  // Función para avanzar al siguiente paso o enviar el formulario
  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    } else {
      // Al llegar al último paso, enviamos el formulario
      handleSubmit();
    }
  };

  // Función para retroceder al paso anterior
  const handleBack = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  // Función para manejar el cambio de los inputs de tipo texto
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Función para manejar el cambio de los selectores (como país o idioma)
  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Total de pasos del formulario
  const totalSteps = 5;

  // Función para validar si el paso actual es válido (revisando los datos ingresados)
  const isStepValid = (): boolean => {
    switch (step) {
      case 0:
        return formData.propertyType.trim() !== "";
      case 1:
        return (
          formData.name.trim() !== "" && validateEmail(formData.email.trim())
        );
      case 2:
        return (
          formData.roomCount.trim() !== "" && Number(formData.roomCount) > 0
        );
      case 3:
        return (
          formData.country.trim() !== "" && formData.language.trim() !== ""
        );
      case 4:
        return (
          formData.companyName.trim() !== "" &&
          validatePhoneNumber(formData.phoneNumber.trim())
        );
      default:
        return false;
    }
  };

  // Función para validar el correo electrónico
  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(email.toLowerCase());
  };

  // Función para validar el número de teléfono (simple validación)
  const validatePhoneNumber = (phone: string): boolean => {
    const re = /^\+?[1-9]\d{1,14}$/; // E.164 international format
    return re.test(phone);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    // Validación final antes de enviar
    if (!isStepValid()) {
      setError("Please fill out all required fields correctly.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simula un proceso de carga de 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aquí se enviaría los datos a un servidor
      console.log("Form submitted:", formData);

      // Opcional: Resetear el formulario o mostrar una notificación de éxito
      // resetForm();
    } catch (err) {
      setError(
        "An error occurred while submitting the form. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para reiniciar el formulario después del envío exitoso
  const resetForm = () => {
    setFormData({
      propertyType: "",
      name: "",
      email: "",
      roomCount: "",
      country: "",
      language: "",
      companyName: "",
      phoneNumber: "",
    });
    setStep(0);
  };

  // Efecto para manejar posibles discrepancias de hidratación (opcional)
  useEffect(() => {
    // Puedes agregar lógica aquí si es necesario
  }, []);

  return (
    // Contenedor principal del formulario con un fondo de gradiente y algunos estilos
    <Paper
      elevation={3}
      sx={{
        background:
          "linear-gradient(135deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)",
        color: "white",
        p: 4,
        borderRadius: 4,
        width: "100%",
        maxWidth: 600,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <AvatarGroup max={3} sx={{ justifyContent: "flex-start", mb: 2 }}>
          <Avatar src="/placeholder.svg" alt="Team member 1" />
          <Avatar src="/placeholder.svg" alt="Team member 2" />
          <Avatar src="/placeholder.svg" alt="Team member 3" />
        </AvatarGroup>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Get a demo tailored to your needs
        </Typography>
      </Box>

      {/* Formulario que se maneja paso a paso */}
      <form onSubmit={(e) => e.preventDefault()}>
        <AnimatePresence mode="wait">
          {/* Animación que cambia con cada paso */}
          <motion.div
            key={step}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Paso 1: Selección del tipo de propiedad */}
            {step === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  What type of property do you manage?
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {propertyTypes.map(({ id, label, icon: Icon }) => (
                    <Grid item xs={6} sm={4} key={id}>
                      <Paper
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, propertyType: id }))
                        }
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          bgcolor:
                            formData.propertyType === id
                              ? "rgba(255, 255, 255, 0.2)"
                              : "rgba(255, 255, 255, 0.1)",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                          },
                        }}
                      >
                        {/* <Icon sx={{ fontSize: 32 }} /> */}
                        <Typography variant="body2" textAlign="center">
                          {label}
                        </Typography>
                        {formData.propertyType === id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          >
                            <Check sx={{ color: theme.palette.success.main }} />
                          </motion.div>
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Paso 2: Información personal */}
            {step === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Tell us about yourself
                </Typography>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={formData.name.trim() === ""}
                  helperText={
                    formData.name.trim() === "" ? "Name is required." : ""
                  }
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={
                    formData.email.trim() === "" ||
                    !validateEmail(formData.email.trim())
                  }
                  helperText={
                    formData.email.trim() === ""
                      ? "Email is required."
                      : !validateEmail(formData.email.trim())
                      ? "Enter a valid email."
                      : ""
                  }
                />
              </Box>
            )}

            {/* Paso 3: Número de habitaciones */}
            {step === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  How many rooms do you manage?
                </Typography>
                <TextField
                  fullWidth
                  label="Number of Rooms"
                  name="roomCount"
                  type="number"
                  value={formData.roomCount}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: 1,
                  }}
                  error={
                    formData.roomCount.trim() === "" ||
                    Number(formData.roomCount) <= 0
                  }
                  helperText={
                    formData.roomCount.trim() === ""
                      ? "Number of rooms is required."
                      : Number(formData.roomCount) <= 0
                      ? "Number of rooms must be greater than 0."
                      : ""
                  }
                />
              </Box>
            )}

            {/* Paso 4: Ubicación y preferencias */}
            {step === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Where are you located?
                </Typography>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Country</InputLabel>
                  <Select
                    name="country"
                    value={formData.country}
                    // onChange={handleSelectChange}
                    label="Country"
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Preferred Language</InputLabel>
                  <Select
                    name="language"
                    value={formData.language}
                    // onChange={handleSelectChange}
                    label="Preferred Language"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    {/* Agrega más idiomas según sea necesario */}
                  </Select>
                </FormControl>
              </Box>
            )}

            {/* Paso 5: Datos finales */}
            {step === 4 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Final details
                </Typography>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={formData.companyName.trim() === ""}
                  helperText={
                    formData.companyName.trim() === ""
                      ? "Company name is required."
                      : ""
                  }
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={
                    formData.phoneNumber.trim() === "" ||
                    !validatePhoneNumber(formData.phoneNumber.trim())
                  }
                  helperText={
                    formData.phoneNumber.trim() === ""
                      ? "Phone number is required."
                      : !validatePhoneNumber(formData.phoneNumber.trim())
                      ? "Enter a valid phone number (e.g., +123456789)."
                      : ""
                  }
                />
              </Box>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Mensaje de error */}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* Botones de navegación entre pasos */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleBack}
            variant="outlined"
            color="secondary"
            disabled={step === 0 || isLoading}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Box sx={{ position: "relative" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={isLoading || !isStepValid()}
            >
              {step === totalSteps - 1 ? "Submit" : "Next"}
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: theme.palette.primary.main,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
