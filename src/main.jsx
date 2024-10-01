import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProductoProvider } from './context/productos.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CategoriaProvider } from './context/categorias.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProductoProvider>
      <CategoriaProvider>
        <App />
      </CategoriaProvider>
    </ProductoProvider>
  </BrowserRouter>
)
