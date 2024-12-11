import { CircularProgress, Box, Typography } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="rgba(0, 0, 0, 0.5)"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
    >
      <CircularProgress size={60} thickness={4} sx={{ color: "white" }} />
      <Typography variant="h6" color="white" mt={2}>
        Loading...
      </Typography>
    </Box>
  );
}
