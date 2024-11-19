import { useContext } from "react";
import { ProductoContext } from "../context/productos";
import { useMapeandoProductosPorNombre } from "../hooks/useMapeandoProductosPorNombre";

export const ServiciosSearch = () => {
  const { guardarNombreProBuscados, mostrarProductosBuscados } = useContext(ProductoContext);
  console.log("hola")
  useMapeandoProductosPorNombre()
  const handleSubmit = (e) => {
    e.preventDefault();
    const valores = e.currentTarget;
    const data = new FormData(valores);
    const final = data.get("producto")
    guardarNombreProBuscados(final);
    valores.reset();
  };

  const handleVolver = () => {
    mostrarProductosBuscados([])
    guardarNombreProBuscados("")
  }

  return { handleSubmit, handleVolver }

};
