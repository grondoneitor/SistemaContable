import { Routes, Route } from 'react-router-dom'
import ShowProductos from './components/Productos/ShowProductos'
import Home from './components/Home'
import PreProductos from './components/PreProductos'
import DetalleProducto from './components/Productos/DetalleProducto'
import CrearProducto from './components/Productos/CrearProducto'
import Categorias from '../src/components/Categorias/Categorias.jsx'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/clientes' element={<h1>el cliente</h1>}></Route>
        <Route path='/pro-cat/' element={<PreProductos />}>
        </Route>
        <Route path="/productos" element={<ShowProductos />} > </Route>
        <Route path='productos/crear-producto' element={<CrearProducto/>}></Route>

        <Route path='/productos/:id' element={<DetalleProducto/>} ></Route>
        
        <Route path="/categorias" element={<Categorias/>} />

      </Routes>

    </>
  )
}

export default App
