import { useContext, useState } from "react";
// import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../../hooks/productos/useCrearProducto";
import { ProductoContext } from "../../context/productos";
import { useBorrarProducto } from "../../hooks/productos/useBorrarProducto";
import { useModificarProducto } from "../../hooks/productos/useModificarProducto";
import { useMapeandoProductosPorNombre } from "../../hooks/productos/useMapeandoProductosPorNombre";

export const ServiciosProducto = (reset) => {

  const { crearProducto, borrarProductoI, editarProducto, guardarNombreProBuscados } = useContext(ProductoContext);

  const { crearProductoReal } = useCrearProducto();
  const { borrarProducto } = useBorrarProducto()
  const { modificarProducto } = useModificarProducto()
  const [isMoved, setIsMoved] = useState(false) 

  const crearProductoServ = async (producto) => {
    //  const categoria = await fetchCategoriaPorId(Number(data.categoria))
    //  const dataFinal = { ...data, categoria }
    const succes = await crearProductoReal(producto);
    if (succes) {
      functionMoved()
      crearProducto(producto)
    }
    reset()
  }

  const borrarProductoServ = async (ids) => {

    const success = await borrarProducto(ids)
    if (success) {
      functionMoved()
      borrarProductoI(ids)
    }

  }
  const editarProductoServ = async (producto) => {

    const succes = await modificarProducto(producto)
    if (succes) {
      functionMoved()
      editarProducto(producto)
      reset()
    }

  }

  const buscandoProductoServ =  (producto) =>{
    const nombre = producto.length === 0 ? "" : producto
      guardarNombreProBuscados(nombre)
    
  }

  const functionMoved = () =>{
    if(isMoved === false){
        setIsMoved(true)
        setTimeout(() => {
            setIsMoved(false)
        },[2000])
    }

}

  return { crearProductoServ, borrarProductoServ, editarProductoServ,buscandoProductoServ, isMoved }

}