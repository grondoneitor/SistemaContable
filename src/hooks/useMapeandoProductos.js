import { useContext, useEffect, useState } from "react";
import { ProductoContext } from "../context/productos";

export const useMapeandoProductos = () => {
  const [allProducts, setAllProductos] = useState([]);
  const [error, setError] = useState(null);
  const {state} = useContext(ProductoContext)
  useEffect(() => {
    console.log("asasd")
    fetch(`http://localhost:8092/api/v1/productos`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setAllProductos(data.object))
      .catch(error => {
        console.error("Error fetching products:", error);
          setError("En este momento no hay productos disponibles");
      });
      // 
       setError(null)
  }, [state.productos]);
   

  return { allProducts, error };
};
