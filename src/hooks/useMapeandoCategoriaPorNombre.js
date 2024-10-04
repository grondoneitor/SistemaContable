import {  useContext, useEffect, useState } from "react";
import { CategoriaContext } from "../context/categorias";

export const useMapeandoCategoriasPorNombre = () => {
     
      const [categoriasNombre, setCategorias] = useState([]);
      const [errorPro, setError] = useState(null);
      const {state} = useContext(CategoriaContext) 
      const nombre = String(state.nombreCategoriaBuscado)
      useEffect(() => {
        console.log(nombre + " desde effect")
        if(!nombre) return
        fetch(`http://localhost:8092/api/v1/categorias/${nombre}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => setCategorias(data.object))
          .catch(error => {
            console.error("Error fetching products:", error);
            setError("No se encontro este producto");
            setCategorias([])
          });
      }, [nombre]);
    
      return { categoriasNombre,setCategorias, errorPro };
    
};
