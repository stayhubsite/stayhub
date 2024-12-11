"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "@mui/material";
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
} from "@mui/icons-material";

const propertyTypes = [
  { id: "hotel", label: "Hotel", icon: Hotel },
  { id: "bnb", label: "Bed & Breakfast", icon: House },
  { id: "hostel", label: "Hostel", icon: Apartment },
  { id: "vacation", label: "Vacation Rental", icon: HomeWork },
  { id: "groups", label: "Groups", icon: Groups },
  { id: "other", label: "Other", icon: More },
];

const countries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "ES", name: "Spain" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  // Add more countries as needed
];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
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
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 0:
        return !!formData.propertyType;
      case 1:
        return !!formData.name && !!formData.email;
      case 2:
        return !!formData.roomCount;
      case 3:
        return !!formData.country && !!formData.language;
      case 4:
        return !!formData.companyName && !!formData.phoneNumber;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular una carga de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setIsLoading(false);
    // Here you would typically send the data to your backend
  };

  return (
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

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
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
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <Typography variant="body1" sx={{ mr: 1 }}>
                        +
                        {countries.find((c) => c.code === formData.country)
                          ?.code || ""}
                      </Typography>
                    ),
                  }}
                />
              </Box>
            )}
          </motion.div>
        </AnimatePresence>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
          }}
        >
          <IconButton
            onClick={handleBack}
            disabled={step === 0}
            sx={{
              color: "white",
              visibility: step === 0 ? "hidden" : "visible",
            }}
          >
            <ArrowBack />
          </IconButton>
          <Box sx={{ display: "flex", gap: 1 }}>
            {[0, 1, 2, 3, 4].map((dot) => (
              <Box
                key={dot}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: dot === step ? "white" : "rgba(255, 255, 255, 0.5)",
                }}
              />
            ))}
          </Box>
          {step < 4 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid()}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                },
                "&:disabled": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.5)",
                },
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
            >
              Next
            </Button>
          ) : (
            <button>
              <Flag sx={{ mr: 1 }} />
              Finish
            </button>
          )}
        </Box>
      </form>
    </Paper>
  );
}
