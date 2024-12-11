import { Box } from "@mui/material";

import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";


export default function HomePage() {
  return (
    <Box>
      <Navbar />
      <ContactForm />
    </Box>
  );
}
