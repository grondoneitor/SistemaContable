import { useContext, useState } from "react"
import { useCrearProveedor } from "../../hooks/proveedores/useCrearProveedor"
import { ProveedoresContext } from "../../context/proveedores"
import useEditarProveedor from "../../hooks/proveedores/useEditarProveedor"
import useBorrarProveedor from "../../hooks/proveedores/useBorrarProveedor"


export const ServiciosProveedores = (reset) => {

    const { crearProveedorReal } = useCrearProveedor()
    const { editarProveedorReal } = useEditarProveedor()
    const { borrarProveedorReal } = useBorrarProveedor()
    const { crearProveedor, editarProveedor, eliminarProveedor, } = useContext(ProveedoresContext)
    const [isMoved, setIsMoved] = useState(false)
    const [isMistake, setIsMistake] = useState(false)

    const crearProveedorServ = async (proveedor) => {
        const success = await crearProveedorReal(proveedor)
        if (success.response.ok) {
            functionMoved()
            crearProveedor(proveedor)
            reset()
            return success.data.object
        } else {
            functionMistake()
        }
    }
    const editarProveedorServ = async (proveedor) => {
        console.log(proveedor)
        const success = await editarProveedorReal(proveedor)
        if (success.ok) {
            functionMoved()
            editarProveedor(proveedor)
            reset()
        } else {
            functionMistake()
        }

    }
    const eliminarProveedorServ = async (ids) => {
        const success = await borrarProveedorReal(ids)
        if (success.ok) {
            functionMoved()
            eliminarProveedor(ids)
            reset()
        } else {
            functionMistake()
        }
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
    return { crearProveedorServ, editarProveedorServ, eliminarProveedorServ, isMistake, isMoved }
}