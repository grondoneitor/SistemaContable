import {  useContext, useEffect, useState } from "react";
import { CategoriaContext } from "../context/categorias";

export const useMapeandoCategoriasPorNombre = () => {
     
      // const [categoriasNombre, setCategorias] = useState([]);
      const [errorValidacion,setError] = useState(null);
      const {state,mostrarCategoriasBuscados} = useContext(CategoriaContext) 
      const nombre = String(state.nombreCategoriaBuscado)
      useEffect(() => {
        if(!nombre) return
        fetch(`http://localhost:8092/api/v1/categorias/${nombre}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data =>{
             mostrarCategoriasBuscados(data.object)
      // if(state.categoriasBuscados.length <= 0 && !errorValidacion ) setError("No se encontro ninguna categoria")
            
            })
          .catch(error => {
            console.error("Error fetching products:", error);
            setError("No se encontro este producto");
          });
      }, [nombre]);

      
    return {errorValidacion}
};
