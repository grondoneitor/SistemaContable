import { useContext, useRef, useState } from "react";
import { ProductoContext } from "../context/productos";
import { useCrearProducto } from "../hooks/useCrearProducto";

export const ServiciosCrear = () => {
    const [producto, setProducto] = useState({
        producto: "",
        precio: "",
        descripcion: "",
        categoria: "",
        stock: "",
        stock_Min: ""
    });
    const { crearProducto } = useContext(ProductoContext);

    const { crearProductoReal } = useCrearProducto();
    const formRef = useRef()
    const validarFormulario = () => {
        let nuevosErrores = [];

        if (producto.producto.length < 3) {
            nuevosErrores.push({ name: "producto", mensaje: "No puede tener menos de 3 caracteres" });
        }

        if (producto.precio <= 0) {
            nuevosErrores.push({ name: "precio", mensaje: "No puede ser 0 o negativo" });
        }

        if (producto.stock <= 0) {
            nuevosErrores.push({ name: "stock", mensaje: "No puede ser 0 o negativo" });
        }

        return nuevosErrores;
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const nuevoProducto = { ...producto };
        const erroresValidaciones =validarFormulario()
        if(errorValidacion.length > 0) {
            setErrorValidacion(erroresValidaciones)
            return
        }
        await crearProductoReal(nuevoProducto);
        crearProducto(nuevoProducto)
        setProducto({
            producto: "",
            precio: "",
            descripcion: "",
            categoria: "",
            stock: "",
            stock_Min: ""
        });



      setErrorValidacion([])

    };

    const [errorValidacion, setErrorValidacion] = useState([{
        name: "",
        hasError: false
    }])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Validación
        let nuevosErrores = errorValidacion.filter(err => err.name !== name);
        if (name === 'producto') {
            console.log(producto.producto)
            const hasError = producto.producto.length < 3 ? true : false
            if (hasError) {
                nuevosErrores.push({ name: "producto", mensaje: "No puede tener menos de 3 caracteres" });
            }
        } else if(name === 'precio'){
            console.log(producto.precio)
            const hasError = producto.precio <= 0 ? true : false
            if(hasError){
                nuevosErrores.push({ name: "precio", mensaje: "No puede ser 0 o negativo" });
            }
        } else if(name=== 'stock'){
            const hasError = producto.stock <= 0 ? true : false
            if (hasError) {
                nuevosErrores.push({ name: "stock", mensaje: "No puede ser 0 o negativo" });
            }
        }


        setErrorValidacion(nuevosErrores);
    };

  
    return { handleOnSubmit, handleChange, producto, errorValidacion,formRef }

}