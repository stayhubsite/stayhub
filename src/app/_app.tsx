import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import theme from "@/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? <LoadingSpinner /> : <Component {...pageProps} />}
    </ThemeProvider>
  );
}

export default MyApp;
