import { Routes, Route } from 'react-router-dom'
import Productos from './components/Productos/Productos.jsx'
import Home from './components/Home'
import Categorias from '../src/components/Categorias/Categorias.jsx'
import FormCrearProducto from './components/Productos/FormCrearPro.jsx'
import FormCrearCategoria from './components/Categorias/FormCrearCategoria.jsx'
import FormDetalleCategoria from './components/Categorias/FormDetalleCategoria.jsx'
import { faPeopleGroup, faBoxesStacked,faCartShopping, faBoxesPacking,faTableCells } from "@fortawesome/free-solid-svg-icons";
import Cliente from './components/Clientes/Cliente.jsx'
function App() {
  const array = [
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
          <Route path='productos' element={<Productos />} >
            <Route path='categorias' element={<Categorias />} >
            <Route path='categorias-crear' element={<FormCrearCategoria/>}/>
            <Route path='categorias-detalle' element={<FormDetalleCategoria/>}/>
            </Route>
          </Route>
          <Route path='productos/crear-producto' element={<FormCrearProducto />}></Route>
        </Route>
      </Routes>

    </body>
  )
}

export default App
