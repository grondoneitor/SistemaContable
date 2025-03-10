import { useContext, useState } from "react";
// import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../../hooks/productos/useCrearProducto";
import { ProductoContext } from "../../context/productos";
import { useBorrarProducto } from "../../hooks/productos/useBorrarProducto";
import { useModificarProducto } from "../../hooks/productos/useModificarProducto";
// import { useMapeandoProductosPorNombre } from "../../hooks/productos/useMapeandoProductosPorNombre";

export const ServiciosProducto = (reset) => {

  const { crearProducto, borrarProductoI, editarProducto} = useContext(ProductoContext);

  const { crearProductoReal } = useCrearProducto();
  const { borrarProducto } = useBorrarProducto()
  const { modificarProducto } = useModificarProducto()
  const [isMoved, setIsMoved] = useState(false)
  const [isMistake, setIsMistake] = useState(false)

  const crearProductoServ = async (producto) => {
    const success = await crearProductoReal(producto);
    if (success.ok) {
      functionMoved()
      crearProducto(producto)
      reset()
    } else {
      functionMistake()
    }
  }

  const borrarProductoServ = async (ids) => {

    const success = await borrarProducto(ids)
    console.log(success)
    if (success.ok) {
      functionMoved()
      borrarProductoI(ids)
    }else{
      functionMistake()
    }

  }
  const editarProductoServ = async (producto) => {

    const success = await modificarProducto(producto)
    console.log(success)
    if (success.ok) {
      functionMoved()
      editarProducto(producto)
      reset()
    }else{
      functionMistake()
    }

  }

  // const buscandoProductoServ = (producto) => {
  //   const nombre = producto.length === 0 ? "" : producto
  //   guardarNombreProBuscados(nombre)

  // }

  const functionMoved = () => {
    if (isMoved === false) {
      setIsMoved(true)
      setTimeout(() => {
        setIsMoved(false)
      }, [2000])
    }

  }
  const functionMistake = () => {
    if (isMistake === false) {
      setIsMistake(true)
      setTimeout(() => {
        setIsMistake(false)
      }, [2000])
    }


  }
  return { crearProductoServ, borrarProductoServ, editarProductoServ,  isMoved, isMistake }

}