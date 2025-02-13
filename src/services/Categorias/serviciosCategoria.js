import { useContext, useState} from "react";
import { useCrearCategoria } from "../../hooks/categorias/useCrearCategoria";
import { CategoriaContext } from "../../context/categorias";
import { useModificarCategoria } from "../../hooks/categorias/useModificarCategoria";
import { useBorrarCategoria } from "../../hooks/categorias/useBorrarCateogria";


export const ServiciosCategoria = (reset) => {
    const { crearCategoria, editarCategoria, borrarCategoria  } = useContext(CategoriaContext)
    const { crearCategoriaReal } = useCrearCategoria()
   const [isMoved, setIsMoved] = useState(false)

    const crearCategoriaServ = async (data) => {

       const nuevaCategoria = data.categoria
        const success = await crearCategoriaReal(nuevaCategoria);
        if (success) {
            crearCategoria(data);
            reset()
            functionMoved()
        }
    };

     const { modificarCategoria } = useModificarCategoria()

    const modificarCategoriaServ = async (data) => {
        console.log(data)
         const success = await modificarCategoria(data)
         if (success){
          editarCategoria(data)
          functionMoved()
         }

    }



  const { borrarCategoriaR } = useBorrarCategoria()

  const borrarCategoriaServ = async (ids) => {
    console.log(ids)
       const success =  await borrarCategoriaR(ids)
       if(success){
            borrarCategoria(ids)
            functionMoved()
       }
    }

    const { guardarNombreCatBuscados, mostrarCategoriasBuscados } = useContext(CategoriaContext)

    const handleSubmitBuscador = (e) => {
        e.preventDefault()
        const valores = e.currentTarget
        const data = new FormData(valores)
        const categoria = data.get("categoria")

        guardarNombreCatBuscados(categoria)
        valores.reset()
    }
    const handleVolverBuscador = () => {
        mostrarCategoriasBuscados([])
        guardarNombreCatBuscados("")
    }


    const functionMoved = () =>{
        if(isMoved === false){
            setIsMoved(true)
            setTimeout(() => {
                setIsMoved(false)
            },[2000])
        }

    }

    return {
        crearCategoriaServ,
        isMoved,
        modificarCategoriaServ,
        borrarCategoriaServ ,
        handleSubmitBuscador,
        handleVolverBuscador
    }
}

