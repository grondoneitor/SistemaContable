import { useContext,  useEffect } from "react";
import { ProductoContext } from "../../context/productos";

export const useMapeandoProductosPorNombre = () => {
  const { state, mostrarProductosBuscados } = useContext(ProductoContext);
  const token = localStorage.getItem("tokenLogin")
  useEffect(() => {
    if(state.nombreProductoBuscado === " ") throw ("El producto no se encuentra")
      fetch(`http://localhost:8092/api/v1/productoName/${state.nombreProductoBuscado}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => mostrarProductosBuscados(data.object))
        .catch(error => {
          mostrarProductosBuscados([])
          console.error("Error fetching products:", error);
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.nombreProductoBuscado,state.productosCreado, state.productoEliminado, state.productoEditado])

};
