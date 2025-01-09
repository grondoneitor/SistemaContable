import { Routes, Route } from 'react-router-dom'
import ShowProductos from './components/Productos/ShowProductos'
import Home from './components/Home'
import Categorias from '../src/components/Categorias/Categorias.jsx'
import FormCrearProducto from './components/Productos/FormCrearPro.jsx'
import FormCrearCategoria from './components/Categorias/FormCrearCategoria.jsx'
import FormDetalleCategoria from './components/Categorias/FormDetalleCategoria.jsx'
function App() {

  const array = [
    {url: "/clientes", nombre:"Clientes"},
    {url:"/productos",nombre:"Productos"},
    {url:"/",nombre:"Ventas"},
    {url:"/", nombre:"Compras y proveedores"},
    {url:"/", nombre:"Estado de cuenta"}
  ]

  return (
    <body>
      <Routes>
        <Route path="/" element={
          <Home
            array={array}
            />
          } >
          <Route path="clientes" element={<h1>el cliente</h1>} />
          <Route path='productos' element={<ShowProductos />} >
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
