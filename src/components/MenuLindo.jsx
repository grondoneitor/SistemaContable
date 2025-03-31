import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet, Link, useLocation } from 'react-router-dom'; // Importa useLocation de react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBasic({ menuItems, window }) {
  const location = useLocation(); // Obtener la ubicación actual

  // Construimos la estructura del menú con <Link />
  const NAVIGATION = menuItems.map((item) => ({
    segment: item.url,
    title: item.nombre,
    icon: <FontAwesomeIcon icon={item.icono} />,
    // Usamos <Link> para la navegación y agregar un estilo dinámico
    component: (
      <Link
        to={`/${item.url}`}
        style={{
          textDecoration: 'none',
          color: location.pathname === `/${item.url}` ? 'blue' : 'black', // Cambia el color según la selección
          fontWeight: location.pathname === `/${item.url}` ? 'bold' : 'normal', // Resalta la opción seleccionada
        }}
      >
        {item.nombre}
      </Link>
    ),
  }));

  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme} window={window}>
      <DashboardLayout>
        <Box sx={{ flex: 1, padding: '20px' }}>
          <Outlet /> {/* Aquí se renderizan las rutas de React Router */}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  menuItems: PropTypes.array.isRequired,
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
