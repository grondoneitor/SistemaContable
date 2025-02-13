import {  useContext, useEffect, useState } from "react";
import { CategoriaContext } from "../context/categorias";

export const useMapeandoCategorias = () => {
  const [error, setError] = useState(null);
  const { mostrarCategorias} = useContext(CategoriaContext)
  useEffect(() => {
        fetch("http://localhost:8092/api/v1/categorias")
        .then(response =>{
            if(!response.ok){
              throw new Error(response.statusText)
            }
            return response.json();
          })
        .then(data =>  mostrarCategorias(data.object))
        .catch(error => {
          console.error("Error fetching products:", error);
          setError("En este momento no hay productos disponibles");
        })
  }, [])

  return { error };
};
