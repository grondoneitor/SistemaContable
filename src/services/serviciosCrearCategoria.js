import { useContext, useEffect, useState } from "react";
import { useCrearCategoria } from "../hooks/useCrearCategoria";
import { CategoriaContext } from "../context/categorias";
import { capitalizeFirstLetter } from "./mayusculaPrimeraLetra";
import { useElegirCategorias } from "../hooks/useElegirCategorias";
import { useModificarCategoria } from "../hooks/useModificarCategoria";
import { useBorrarCategoria } from "../hooks/useBorrarCateogria";



export const ServiciosCrearCategoria = () => {
    const [categoriaFinal, setCategoriaFinal] = useState({ id: null, categoria: "" })
    const { crearCategoria,editarCategoria,borrarCategoria } = useContext(CategoriaContext)
    const { crearCategoriaReal } = useCrearCategoria()
    const [categ, setCateg] = useState({id_Categoria:null,categoria:""})
    const [activo, setActivo] = useState(false)
    const { state } = useElegirCategorias()


    const handleSubmitCrear = async () => {

        const nuevaCategoria = { ...categoriaFinal };

        // Agregar la nueva categoría usando el hook de crear categoría
        await crearCategoriaReal(nuevaCategoria);

        // Agregarla al estado del contexto
        crearCategoria(nuevaCategoria);

        // Reiniciar el estado del formulario
        setCategoriaFinal({ id: null, categoria: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoriaFinal((prevState) => ({
            ...prevState, // Mantén el estado anterior
            [name]: value // Actualiza solo el campo que cambió
        }));
    };
    const handleOnClick = (categoria) => {

        const cat = {
            id_Categoria: categoria.id_Categoria,
            categoria: capitalizeFirstLetter(categoria.categoria)}
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
        setCateg({id:null,categoria:""});
    }
    
    const [nombreCategoriaNueva, setNombreCategoriaNueva] = useState("")
    const handleChangeEdi = (e) => {
        const {  value } = e.target;
        setNombreCategoriaNueva(value);
    };
    const {modificarCategoria} =useModificarCategoria()
    
    const handleModificar = async()=>{
        const nuevoCateg ={
            id_Categoria:categ.id_Categoria,
            categoria:nombreCategoriaNueva
        }
        await modificarCategoria(nuevoCateg)
        editarCategoria(nuevoCateg)

    }
  
  
    
    const {borrarCategoriaR} = useBorrarCategoria()

    const handleDelete = async()=>{
        console.log(categ.id_Categoria + " categ delete")
        await borrarCategoriaR(categ)
        borrarCategoria(categ)
    }

    const {guardarNombreCatBuscados,mostrarCategoriasBuscados} = useContext(CategoriaContext)

    const handleSubmitBuscador = (e)=>{
        e.preventDefault()
        const valores = e.currentTarget
        const data = new FormData(valores)
        const categoria = data.get("categoria")
        
        guardarNombreCatBuscados(categoria)
        console.log(categoria + " categoria")
        valores.reset()
    }
   const handleVolverBuscador =()=>{
    mostrarCategoriasBuscados([])
    guardarNombreCatBuscados("")
   }

    return { 
        handleChange, 
        handleSubmitCrear, 
        handleOnClick,
        handleVolver,
        state, 
        activo,
        categ,
        handleModificar, 
        handleChangeEdi,
        handleDelete,
        handleSubmitBuscador,
        handleVolverBuscador 
    }
}

