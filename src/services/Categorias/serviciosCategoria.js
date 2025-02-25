import { useContext, useState } from "react";
import { useCrearCategoria } from "../../hooks/categorias/useCrearCategoria";
import { CategoriaContext } from "../../context/categorias";
import { useModificarCategoria } from "../../hooks/categorias/useModificarCategoria";
import { useBorrarCategoria } from "../../hooks/categorias/useBorrarCateogria";


export const ServiciosCategoria = (reset) => {
    const { crearCategoria, editarCategoria, borrarCategoria } = useContext(CategoriaContext)
    const { crearCategoriaReal } = useCrearCategoria()
    const [isMoved, setIsMoved] = useState(false)
    const [isMistake, setIsMistake] = useState(false)

    const crearCategoriaServ = async (data) => {

        const nuevaCategoria = data.categoria
        const success = await crearCategoriaReal(nuevaCategoria);
        if (success.ok) {
            crearCategoria(data);
            reset()
            functionMoved()
        } else {
            functionMistake()
        }
    };

    const { modificarCategoria } = useModificarCategoria()

    const modificarCategoriaServ = async (data) => {
        const success = await modificarCategoria(data)
        console.log(success)
        if (success.ok) {
            editarCategoria(data)
            functionMoved()
        }else{
            functionMistake()
        }

    }



    const { borrarCategoriaR } = useBorrarCategoria()

    const borrarCategoriaServ = async (ids) => {
        console.log(ids)
        const success = await borrarCategoriaR(ids)
        console.log(success)
        if (success.ok) {
            console.log(ids)
            borrarCategoria(ids)
            functionMoved()
        }else{
            functionMistake()
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
    return {
        crearCategoriaServ,
        isMoved,
        modificarCategoriaServ,
        borrarCategoriaServ,
        handleSubmitBuscador,
        handleVolverBuscador,
        isMistake
    }
}

