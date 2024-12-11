import { Box, Container, Typography, Grid } from "@mui/material";
import MultiStepForm from "@/components/MultiStepForm";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function ContactForm() {
  const features = [
    "Check-in/Check out Guests with one click",
    "Manage bookings with a drag-and-drop calendar",
    "Sync your reservations real-time",
    "Focus on guests, not tasks",
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            ></Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: "bold", mb: 4 }}
            >
              StayHub
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <CheckCircleOutlineIcon sx={{ color: "success.main" }} />
                  <Typography variant="body1">{feature}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <MultiStepForm />
        </Grid>
      </Grid>
    </Container>
  );
}
