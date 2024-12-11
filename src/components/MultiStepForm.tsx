// Importaciones necesarias para trabajar con React, animaciones y MUI (Material UI)
"use client";

import { useState } from "react";
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
  Flag,
} from "@mui/icons-material"; // Iconos de Material UI

// Lista de tipos de propiedades con sus iconos
const propertyTypes = [
  { id: "hotel", label: "Hotel", icon: Hotel },
  { id: "bnb", label: "Bed & Breakfast", icon: House },
  { id: "hostel", label: "Hostel", icon: Apartment },
  { id: "vacation", label: "Vacation Rental", icon: HomeWork },
  { id: "groups", label: "Groups", icon: Groups },
  { id: "other", label: "Other", icon: More },
];

// Lista de países para el formulario
const countries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "ES", name: "Spain" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  // Add more countries as needed
];

// Componente principal del formulario multi-pasos
export default function MultiStepForm() {
  // Estado para controlar el paso actual del formulario
  const [step, setStep] = useState(0);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
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
  const [isLoading, setIsLoading] = useState(false);

  // Usamos el tema de MUI
  const theme = useTheme();

  // Función para avanzar al siguiente paso
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  // Función para retroceder al paso anterior
  const handleBack = () => {
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

  // Función para validar si el paso actual es válido (revisando los datos ingresados)
  const isStepValid = () => {
    switch (step) {
      case 0:
        return !!formData.propertyType; // Verifica si se seleccionó un tipo de propiedad
      case 1:
        return !!formData.name && !!formData.email; // Verifica si se ingresaron nombre y email
      case 2:
        return !!formData.roomCount; // Verifica si se ingresó el número de habitaciones
      case 3:
        return !!formData.country && !!formData.language; // Verifica si se seleccionó país y idioma
      case 4:
        return !!formData.companyName && !!formData.phoneNumber; // Verifica si se ingresaron empresa y teléfono
      default:
        return false;
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula un proceso de carga de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData); // Muestra los datos del formulario en la consola
    setIsLoading(false);
    // Aquí se enviaría los datos a un servidor
  };

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
      <form onSubmit={handleSubmit}>
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
                        <Icon sx={{ fontSize: 32 }} />
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
                    onChange={handleSelectChange}
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
                    onChange={handleSelectChange}
                    label="Preferred Language"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
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
                />
              </Box>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación entre pasos */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            onClick={handleBack}
            variant="outlined"
            color="secondary"
            disabled={step === 0}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={isStepValid() ? handleNext : undefined}
            disabled={isLoading || !isStepValid()}
          >
            {step === 4 ? "Submit" : "Next"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
