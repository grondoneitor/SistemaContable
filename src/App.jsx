import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Categorias from '../src/components/Categorias/Categorias.jsx'
import { faPeopleGroup, faBoxesStacked,faCartShopping, faBoxesPacking,faTableCells } from "@fortawesome/free-solid-svg-icons";
import Cliente from './components/Clientes/Cliente.jsx'
import FormProductos from './components/Productos/FormProductos.jsx';
function App() {
  const array = [
    {url:"/",nombre:"Home",icono:faCartShopping},
    {url: "/clientes", nombre:"Clientes", icono:faPeopleGroup},
    {url:"/productos",nombre:"Productos", icono:faBoxesStacked},
    {url:"/",nombre:"Ventas",icono:faCartShopping},
    {url:"/", nombre:"Compras y proveedores", icono:faBoxesPacking},
    {url:"/", nombre:"Estado de cuenta", icono:faTableCells}
  ]

  return (
    <body>
      <Routes>
        <Route path="/" element={
          <Home
             array={array}
            />
          } >
          <Route path="clientes" element={<Cliente/>} />
          <Route path='productos' element={<FormProductos />} >
            <Route path='categorias' element={<Categorias />} >
            </Route>
          </Route>
        </Route>
      </Routes>

    </body>
  )
}

export default App
