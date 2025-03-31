import { useContext, useEffect, useState } from "react";
import { ProductoContext } from "../../context/productos";
import { CategoriaContext } from "../../context/categorias";

export const useMapeandoProductos = () => {
  const [error, setError] = useState(null);
  const { state, mostrarProductos } = useContext(ProductoContext)
  const { state: stateCategorias } = useContext(CategoriaContext)
  const token = localStorage.getItem("tokenLogin")
  if (state.filters.nombre === undefined) state.filters.nombre = ""
  if (state.filters.categoria === undefined) state.filters.categoria = ""
  useEffect(() => {
    fetch(`http://localhost:8092/api/v1/productos?nombre=${state.filters.nombre}&categoria=${state.filters.categoria}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    )
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
  }, [state.productosCreado, state.productoEliminado, state.productoEditado, stateCategorias.categoriaCreada, stateCategorias.categoriaEditada, stateCategorias.categoriaEliminada, state.filters]);


  return { error };
};
