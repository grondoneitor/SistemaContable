import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Categorias from '../src/components/Categorias/Categorias.jsx'
import { faPeopleGroup, faBoxesStacked, faCartShopping, faBoxesPacking, faTableCells, faHouse } from "@fortawesome/free-solid-svg-icons";
import Cliente from './components/Clientes/Cliente.jsx'
import FormProductos from './components/Productos/FormProductos.jsx';
import SignUp from './components/Auth/SignUp.jsx';
import LogIn from './components/Auth/LogIn.jsx';
import { PrivateRoute } from './components/Auth/PrivateRoute.jsx';
import Dashboard from './components/DashBoard/Dashboard.jsx';
function App() {
  const array = [
    { url: "/dashboard", nombre: "Dashboard", icono: faHouse },
    { url: "/clientes", nombre: "Clientes", icono: faPeopleGroup },
    { url: "/productos", nombre: "Productos", icono: faBoxesStacked },
    { url: "/", nombre: "Ventas", icono: faCartShopping },
    { url: "/", nombre: "Compras y proveedores", icono: faBoxesPacking },
    { url: "/", nombre: "Estado de cuenta", icono: faTableCells }
  ]
  return (
    <body className=''>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route element={<PrivateRoute />} >
          <Route path="/" element={<Home array={array} />} >
          <Route path="dashboard" element={<Dashboard />} />
            <Route path="clientes" element={<Cliente />} />
            <Route path='productos' element={<FormProductos />} >
              <Route path='categorias' element={<Categorias />} >
              </Route>
            </Route>
          </Route>
        </Route>
   
       <Route path='*' element="Pagina no encontrada"/>

      </Routes>

    </body>
  )
}

export default App
