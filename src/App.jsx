import { Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp.jsx';
import LogIn from './components/Auth/LogIn.jsx';
import { PrivateRoute } from './components/Auth/PrivateRoute.jsx';
import Dashboard from './components/DashBoard/Dashboard.jsx';
import Cliente from './components/Clientes/Cliente.jsx';
import Ventas from './components/Ventas/Ventas.jsx';
import Proveedores from './components/Proveedores/Proveedores.jsx';
import Compras from './components/Compras/Compras.jsx';
import FormProductos from './components/Productos/FormProductos.jsx';
import Categorias from './components/Categorias/Categorias.jsx';
import DashboardLayoutBasic from './components/MenuLindo.jsx';
import { faBoxesPacking, faBoxesStacked, faCartShopping, faHouse, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home.jsx';
const array = [
  { url: "dashboard", nombre: "Dashboard", icono: faHouse },
  { url: "clientes", nombre: "Clientes", icono: faPeopleGroup  },
  { url: "ventas", nombre: "Ventas", icono: faCartShopping },
  { url: "productos", nombre: "Productos", icono: faBoxesStacked },
  { url: "productos/categorias", nombre: "Categorías", icono: faBoxesStacked },
  { url: "proveedores", nombre: "Proveedores", icono: faBoxesPacking },
  { url: "compras", nombre: "Compras", icono: faBoxesPacking },
];
function App() {

  return (
    <Routes>
      {/* Rutas de autenticación */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />

      {/* Rutas protegidas con el menú fijo */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home array={array} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clientes" element={<Cliente />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="productos" element={<FormProductos />} >
          <Route path="categorias" element={<Categorias />} />
           </Route>
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="compras" element={<Compras />} />
        </Route>
      </Route>

      {/* Página no encontrada */}
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
