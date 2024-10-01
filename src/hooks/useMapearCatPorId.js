import { useEffect, useState } from "react";


export const useMapeandoCategoriaPorId = (id) => {
  const [categoriaId, setCategoriaId] = useState({});
  const [errorPro, setError] = useState(null);
    
 console.log("este es el id desde map " + id)  

  useEffect(() => {
    if(!id) return

    fetch(`http://localhost:8092/api/v1/categoria/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCategoriaId(data.object))
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("No se encontro este producto");
        setCategoriaId([])
      });
  }, [id]);

  return { categoriaId,setCategoriaId, errorPro };
};
