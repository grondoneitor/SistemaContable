import { useContext } from "react";
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

  const crearProductoServ = async (producto) => {
    console.log(producto)
    //  const categoria = await fetchCategoriaPorId(Number(data.categoria))
    //  const dataFinal = { ...data, categoria }
    const succes = await crearProductoReal(producto);
    if (succes) {
      console.log(succes)
      crearProducto(producto)
    }
    reset()
  }

  const borrarProductoServ = async (id) => {

    const succes = await borrarProducto(id)
    if (succes) {
      console.log(succes)
      borrarProductoI(id)
    }

  }
  const editarProductoServ = async (producto) => {

    const succes = await modificarProducto(producto)
    console.log(succes)
    if (succes) {
      console.log("vamos a editar")
      editarProducto(producto)
    }

  }



  return { crearProductoServ, borrarProductoServ, editarProductoServ }

}