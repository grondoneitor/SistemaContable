import { Routes, Route } from 'react-router-dom'
import ShowProductos from './components/Productos/ShowProductos'
import Home from './components/Home'
import Categorias from '../src/components/Categorias/Categorias.jsx'
import FormCrearProducto from './components/Productos/FormCrearPro.jsx'
function App() {


  return (
    <body>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="clientes" element={<h1>el cliente</h1>} />
          <Route path='/productos' element={<ShowProductos />} />
          <Route path='/categorias' element={<Categorias />} />
          <Route path='productos/crear-producto' element={<FormCrearProducto />}></Route>
        </Route>
      </Routes>

    </body>
  )
}

export default App
