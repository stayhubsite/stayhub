// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Activa el modo estricto de React para ayudarte a identificar problemas.
  swcMinify: true, // Utiliza el compilador SWC para minificar tu código, mejorando el rendimiento.
  images: {
    domains: ['example.com'], // Reemplaza con los dominios desde los cuales cargarás imágenes.
  },
  // Habilita las rutas de imágenes externas si es necesario
  // i18n: {
  //   locales: ['en', 'es'],
  //   defaultLocale: 'es',
  // },
  // Configuraciones adicionales...
};

module.exports = nextConfig;
