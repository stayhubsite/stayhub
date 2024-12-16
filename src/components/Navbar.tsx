"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import ModalRL from "./ModalsRL"; // Componente para manejar inicio de sesión y registro.

// Lista de páginas que se muestran en el menú de navegación.
const pages = ["Features", "Enterprise Solutions", "Integrations"];

export default function Navbar() {
  // Estado para manejar el menú de navegación en dispositivos móviles.
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  // Estado para manejar el menú de selección de idioma.
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  // Abre el menú de navegación.
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // Abre el menú de selección de idioma.
  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  // Cierra el menú de navegación.
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Cierra el menú de selección de idioma.
  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)", // Aplica un efecto de desenfoque.
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo semi-transparente.
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)", // Línea inferior tenue.
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo que se muestra en pantallas grandes */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            StayHub
          </Typography>

          {/* Menú para dispositivos móviles */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo que se muestra en dispositivos móviles */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            StayHub
          </Typography>

          {/* Menú para pantallas grandes */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "text.primary",
                  display: "block",
                  "&:hover": {
                    color: "primary.main", // Cambia el color al pasar el mouse.
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Botones de acción */}
          <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
            <ModalRL />

            {/* Botón para solicitar contacto */}
            <Button
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark", // Color más oscuro al pasar el mouse.
                },
                display: { xs: "none", sm: "block" },
              }}
            >
              Request Contact
            </Button>

            {/* Botón para cambiar el idioma */}
            <IconButton
              onClick={handleOpenLangMenu}
              sx={{ color: "text.primary" }}
            >
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElLang}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
            >
              <MenuItem onClick={handleCloseLangMenu}>English</MenuItem>
              <MenuItem onClick={handleCloseLangMenu}>Español</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
