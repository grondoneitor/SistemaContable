import { useContext, useState } from "react"
import { useCrearCompra } from "../../hooks/compras/useCrearCompra"
import { ComprasContext } from "../../context/compras"
import { useBorrarCompras } from "../../hooks/compras/useBorrarCompras"
import {useModificarCompra} from "../../hooks/compras/useModificarCompra.js"

export default function ComprasServicios(){


    const {crearCompraReal} = useCrearCompra()
    const {modificarCompra} = useModificarCompra()
    const { borrarCompras } = useBorrarCompras()
    const {crearCompraContext, modificarCompraContext, eliminarCompraContext} = useContext(ComprasContext)
    const [isMoved, setIsMoved] = useState(false)
    const [isMistake, setIsMistake] = useState(false)

    const crearCompra = async (compra) => {
        console.log("compra desde servicios ", compra)
        const success = await crearCompraReal(compra)
        console.log("Mensaje ",success)
        if(success.ok){
           await crearCompraContext(compra)
           functionMoved()
        }else{
            functionMistake()
        }


    }
    const modificarCompraservicio = async (compra) => {
        const success = await modificarCompra(compra)
        console.log(success)
        if(success.ok){
            await modificarCompraContext(compra)
           functionMoved()
        }else{
            functionMistake()
        }


    }
    const eliminarCompraServicio = async (ids) => {
        const success = await borrarCompras(ids)
        console.log(success)
        if(success.ok){
            await eliminarCompraContext(ids)
           functionMoved()
        }else{
            functionMistake()
        }


    }


    const functionMoved =  ( ) =>{
         if(isMoved === false){
            setIsMoved(true)
            setTimeout(()=>{
                setIsMoved(false)
            },[2000])
         }
    }
    const functionMistake =  ( ) =>{
        if(isMistake === false){
            setIsMistake(true)
           setTimeout(()=>{
            setIsMistake(false)
           },[2000])
        }
   }


    return{crearCompra, modificarCompraservicio ,isMoved, isMistake , eliminarCompraServicio}
}