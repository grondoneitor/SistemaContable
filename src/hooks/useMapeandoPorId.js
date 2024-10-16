import { useContext, useEffect, useState } from "react";
import { ProductoContext } from "../context/productos";


export const useMapeandoProductosPorId = (id) => {
  const [productosId, setProductosId] = useState({});
  const [errorPro, setError] = useState(null);
  const {state} = useContext(ProductoContext)
 console.log("este es el id desde map " + id)  

  useEffect(() => {
    if(!id) return

    fetch(`http://localhost:8092/api/v1/producto/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setProductosId(data.object))
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("No se encontro este producto");
        setProductosId([])
      });
  }, [id]);

  return { productosId,setProductosId, errorPro };
};
