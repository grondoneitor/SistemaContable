import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProductoProvider } from './context/productos.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CategoriaProvider } from './context/categorias.jsx'
import { ClienteProvider } from './context/cliente.jsx'
import { AuthProvider } from './context/auth.jsx'
import { VentasProvider } from './context/ventas.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductoProvider>
        <CategoriaProvider>
          <ClienteProvider>
            <VentasProvider>
              <App />
            </VentasProvider>
          </ClienteProvider>
        </CategoriaProvider>
      </ProductoProvider>
    </AuthProvider>
  </BrowserRouter>
)
