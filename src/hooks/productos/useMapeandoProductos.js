import { useContext, useEffect, useState } from "react";
import { ProductoContext } from "../../context/productos";
import { CategoriaContext } from "../../context/categorias";

export const useMapeandoProductos = () => {
  const [error, setError] = useState(null);
  const {state,mostrarProductos} = useContext(ProductoContext)
  const {state : stateCategorias} = useContext(CategoriaContext)
  useEffect(() => {
    fetch(`http://localhost:8092/api/v1/productos`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => mostrarProductos(data.object))
      .catch(error => {
        console.error("Error fetching products:", error);
          setError("En este momento no hay productos disponibles");
      });
      // 
       setError(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.productosCreado, state.productoEliminado, state.productoEditado, stateCategorias.categoriaCreada, stateCategorias.categoriaEditada, stateCategorias.categoriaEliminada]);
   

  return {  error };
};
 