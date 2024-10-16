import {  useContext, useEffect, useState } from "react";
import { CategoriaContext } from "../context/categorias";

export const useMapeandoCategorias = () => {
  const [error, setError] = useState(null);
  const {state, mostrarCategorias} = useContext(CategoriaContext)
  useEffect(() => {
    
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`http://localhost:8092/api/v1/categorias`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        mostrarCategorias(data.object);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("En este momento no hay productos disponibles");
      }
    };

    fetchCategorias();
  }, [state.categoriaCreada])

  return { error };
};
