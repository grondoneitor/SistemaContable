import { useContext, useState, useEffect } from "react";
import { ProductoContext } from "../../context/productos";

export const useMapeandoProductosPorNombre = () => {
  const [setError] = useState(null);
  const { state, mostrarProductosBuscados } = useContext(ProductoContext);
  useEffect(() => {
      fetch(`http://localhost:8092/api/v1/productoName/${state.nombreProductoBuscado}`)
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
          setError("En este momento no hay productos disponibles");
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.nombreProductoBuscado,state.productosCreado, state.productoEliminado, state.productoEditado])

};
