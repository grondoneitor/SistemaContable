import { useContext, useEffect, useState } from "react";
import { ProductoContext } from "../context/productos";
import { useMapeandoCategoriaPorId } from "./useMapearCatPorId";
export const useMapeandoProductosPorNombre = () => {
  const [errorPro, setError] = useState(null);
  const { state, mostrarProductosBuscados } = useContext(ProductoContext)
  const nombre = String(state.nombreProductoBuscado)
  const [objeto, setObjeto] = useState({})
  useEffect(() => {
    fetch(`http://localhost:8092/api/v1/productoName/${nombre}`)
      .then(response => {
        if (!response.ok) {
          console.log("errore")
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();

      })
      .then(data => mostrarProductosBuscados(data.object))
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("No se encontro este producto");
        mostrarProductosBuscados([])
      });
  }, [nombre]);

  return { errorPro, objeto };
};

// export const useDevolviendoProductoCompleto=()=>{
//   const {objeto}= useMapeandoProductosPorNombre()
//   const [objetoCompleto, setObjetoCompleto] = useState({})


//  if(objeto !== undefined) console.log(objeto[0])

  
// }