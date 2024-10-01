import { useEffect, useState } from "react";

export const useMapeandoProductos = () => {
  const [allProducts, setAllProductos] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
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
  }, []);
   

  return { allProducts, error };
};
