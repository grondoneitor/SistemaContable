import { useContext, useState } from "react"
import { useCrearVenta } from "../../hooks/ventas/useCrearVenta"
import { VentasContext } from "../../context/ventas"
import { useModificarVenta } from "../../hooks/ventas/useModificarVenta"
import { useBorrarVentas } from "../../hooks/ventas/useBorrarVentas"


export default function VentasServicios (){


    const {crearVentaReal} = useCrearVenta()
    const {modificarVenta} = useModificarVenta()
    const { borrarVentas } = useBorrarVentas()
    const {crearVentaContext, modificarVentaContext, eliminarVentaContext} = useContext(VentasContext)
    const [isMoved, setIsMoved] = useState(false)
    const [isMistake, setIsMistake] = useState(false)

    const crearVenta = async (venta) => {
        const success = await crearVentaReal(venta)
        console.log("Mensaje ",success)
        if(success.ok){
           await crearVentaContext(venta)
           functionMoved()
        }else{
            functionMistake()
        }


    }
    const modificarVentaServicio = async (venta) => {
        const success = await modificarVenta(venta)
        console.log(success)
        if(success.ok){
            await modificarVentaContext(venta)
           functionMoved()
        }else{
            functionMistake()
        }


    }
    const eliminarVentaServicio = async (ids) => {
        const success = await borrarVentas(ids)
        console.log(success)
        if(success.ok){
            await eliminarVentaContext(ids)
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


    return{crearVenta, modificarVentaServicio ,isMoved, isMistake , eliminarVentaServicio}
}