import {  useContext, useEffect, useState } from "react";
import { ProductoContext } from "../context/productos";


export const useMapeandoProductosPorNombre = () => {
  const [productosNombre, setProductos] = useState([]);
  const [errorPro, setError] = useState(null);
  const {state} = useContext(ProductoContext) 
  const nombre = String(state.nombreProductoBuscado)
  useEffect(() => {
  if(!nombre) return
  console.log(nombre + " desde effect")
    fetch(`http://localhost:8092/api/v1/productoName/${nombre}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setProductos(data.object))
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("No se encontro este producto");
        setProductos([])
      });
  }, [nombre]);

  return { productosNombre,setProductos, errorPro };
};
