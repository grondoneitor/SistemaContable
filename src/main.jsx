import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProductoProvider } from './context/productos.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CategoriaProvider } from './context/categorias.jsx'
import { ClienteProvider } from './context/cliente.jsx'
import { AuthProvider } from './context/auth.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <ProductoProvider>
      <CategoriaProvider>
        <ClienteProvider>
        <App />
        </ClienteProvider>
      </CategoriaProvider>
    </ProductoProvider>
    </AuthProvider>
  </BrowserRouter>
)
