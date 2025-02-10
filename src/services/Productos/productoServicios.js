import { useContext, useState } from "react";
// import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../../hooks/productos/useCrearProducto";
import { ProductoContext } from "../../context/productos";
import { useBorrarProducto } from "../../hooks/productos/useBorrarProducto";
import { useModificarProducto } from "../../hooks/productos/useModificarProducto";

export const ServiciosProducto = (reset) => {

  const { crearProducto, borrarProductoI, editarProducto } = useContext(ProductoContext);

  const { crearProductoReal } = useCrearProducto();
  const { borrarProducto } = useBorrarProducto()
  const { modificarProducto } = useModificarProducto()
  const [isMoved, setIsMoved] = useState(false) 

  const crearProductoServ = async (producto) => {
    console.log(producto)
    //  const categoria = await fetchCategoriaPorId(Number(data.categoria))
    //  const dataFinal = { ...data, categoria }
    const succes = await crearProductoReal(producto);
    if (succes) {
      functionMoved()
      crearProducto(producto)
    }
    reset()
  }

  const borrarProductoServ = async (id) => {

    const success = await borrarProducto(id)
    if (success) {
      functionMoved()
      borrarProductoI(id)
    }

  }
  const editarProductoServ = async (producto) => {

    const succes = await modificarProducto(producto)
    console.log(succes)
    if (succes) {
      functionMoved()
      editarProducto(producto)
      reset()
    }

  }

  const functionMoved = () =>{
    if(isMoved === false){
        setIsMoved(true)
        setTimeout(() => {
            setIsMoved(false)
        },[2000])
    }

}

  return { crearProductoServ, borrarProductoServ, editarProductoServ, isMoved }

}