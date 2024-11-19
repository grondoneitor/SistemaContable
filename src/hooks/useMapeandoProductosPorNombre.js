import { useContext, useEffect, useState } from "react";
import { ProductoContext } from "../context/productos";
import { fetchCategoriaPorId } from "./useMapearCatPorId";

export const  useMapeandoProductosPorNombre = () => {
  const [errorPro, setError] = useState(null);
  const { state, mostrarProductosBuscados } = useContext(ProductoContext);
  const nombre = String(state.nombreProductoBuscado);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:8092/api/v1/productoName/${nombre}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const productos = data.object;

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
        setError("No se encontraron productos");
        mostrarProductosBuscados([]);
      }
    };

    if (nombre) {
      fetchProductos()
    }
  }, [nombre]);
};
