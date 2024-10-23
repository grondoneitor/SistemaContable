import { useContext, useEffect, useState } from "react";
import { useCrearCategoria } from "../hooks/useCrearCategoria";
import { CategoriaContext } from "../context/categorias";
import { capitalizeFirstLetter } from "./mayusculaPrimeraLetra";
import { useModificarCategoria } from "../hooks/useModificarCategoria";
import { useBorrarCategoria } from "../hooks/useBorrarCateogria";


export const ServiciosCrearCategoria = (reset) => {
    const { crearCategoria, editarCategoria, borrarCategoria, categoriaCreada } = useContext(CategoriaContext)
    const { crearCategoriaReal } = useCrearCategoria()
    const [categ, setCateg] = useState({ id_Categoria: null, categoria: "" })
    const [activo, setActivo] = useState(false)
 

    const handleSubmitCrear = async (data) => {

        
        await crearCategoriaReal(data);
        crearCategoria(data);
        categoriaCreada(data)
        reset()
    };


    const handleOnClick = (categoria) => {
        const cat = {
            id_Categoria: categoria.id_Categoria,
            categoria: capitalizeFirstLetter(categoria.categoria)
        }
        setCateg(cat)
    }
    useEffect(() => {
        if (categ.categoria !== "") {
            setActivo(true)
        } else {
            setActivo(false)
        }

    }, [categ])

    const handleVolver = () => {
        setCateg({ id: null, categoria: "" });
    }


    const { modificarCategoria } = useModificarCategoria()

    const handleModificar = async (data) => {
        console.log(data)
        const objectFinal = {
            id_Categoria: categ.id_Categoria,
            categoria:data.categoria
        }
       const access = await modificarCategoria(objectFinal)
       if(access) editarCategoria(objectFinal)
       setCateg({ id_Categoria: null, categoria: "" })

    }



    const { borrarCategoriaR } = useBorrarCategoria()

    const handleDelete = async () => {
        console.log(categ.id_Categoria + " categ delete")
        await borrarCategoriaR(categ)
        borrarCategoria(categ)
        setCateg({ id_Categoria: null, categoria: "" })
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



    
    return {
        handleSubmitCrear,
        handleOnClick,
        handleVolver,
        activo,
        categ,
        handleModificar,
        handleDelete,
        handleSubmitBuscador,
        handleVolverBuscador
    }
}

