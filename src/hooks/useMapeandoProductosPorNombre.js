import { useContext, useEffect } from "react";
import { ProductoContext } from "../context/productos";
import { fetchCategoriaPorId } from "../services/fetchCategoriaPorId";

export const  useMapeandoProductosPorNombre = () => {
  const { state, mostrarProductosBuscados } = useContext(ProductoContext);
  const nombre = String(state.nombreProductoBuscado);

  console.log(nombre)
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:8092/api/v1/productoName/${nombre}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const productos = data.object;
        console.log(productos)
        // Enriquecer los productos con las categorías
        const productosConCategorias = await Promise.all(
          productos.map(async (producto) => {
            const categoria = await fetchCategoriaPorId(producto.categoria)
            return { ...producto, categoria };
          })
        );
        mostrarProductosBuscados(productosConCategorias);
      } catch (error) {
        console.error("Error fetching products:", error);
        mostrarProductosBuscados([]);
      }
    };

    if (nombre) {
      fetchProductos()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ nombre]);
};
