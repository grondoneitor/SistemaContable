import { useContext, useEffect, useState } from "react";
import { useCrearCategoria } from "../hooks/useCrearCategoria";
import { CategoriaContext } from "../context/categorias";
import { capitalizeFirstLetter } from "./mayusculaPrimeraLetra";
import { useModificarCategoria } from "../hooks/useModificarCategoria";
import { useBorrarCategoria } from "../hooks/useBorrarCateogria";


export const ServiciosCrearCategoria = () => {
    const { crearCategoria, editarCategoria, borrarCategoria, categoriaCreada } = useContext(CategoriaContext)
    const { crearCategoriaReal } = useCrearCategoria()
    const [categ, setCateg] = useState({ id_Categoria: null, categoria: "" })
    const [activo, setActivo] = useState(false)
 

    const handleSubmitCrear = async (event) => {
        event.preventDefault()
        const dat = event.currentTarget
        const data = new FormData(dat)
    
        const formDataObj = {}
        data.forEach((value, key) => {
            formDataObj[key] = value
        })

        await crearCategoriaReal(formDataObj);
        crearCategoria(formDataObj);
        categoriaCreada(formDataObj)
        dat.reset()
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

    // const [nombreCategoriaNueva, setNombreCategoriaNueva] = useState("")
    // const handleChangeEdi = (e) => {
    //     const { value } = e.target;
    //     console.log(categ.categoria + " categoria se")
    //     if (value === "") {
    //         setNombreCategoriaNueva(categ.categoria);
    //     } else {
    //         setNombreCategoriaNueva(value);
    //     }

    // };
    const { modificarCategoria } = useModificarCategoria()

    const handleModificar = async (event) => {
        event.preventDefault();
        const dat = event.currentTarget
        const data = new FormData(dat)
        
        const formDataObj = {}
        data.forEach((value,key) =>{
            formDataObj[key] = value
        })

        const objectFinal = {
            id_Categoria: categ.id_Categoria,
            categoria:formDataObj.categoria
        }
        await modificarCategoria(objectFinal)
        editarCategoria(objectFinal)
        dat.reset()
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
        // handleChangeEdi,
        handleDelete,
        handleSubmitBuscador,
        handleVolverBuscador
    }
}

