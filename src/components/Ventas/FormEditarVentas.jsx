/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react"
import { ClienteContext } from "../../context/cliente"
import { useForm } from "react-hook-form"
import { ProductoContext } from "../../context/productos"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaVentas } from "../../services/validaciones"
import VentasServicios from "../../services/Ventas/ventasServicios"
import { VentasContext } from "../../context/ventas"
import { SuccessOrError } from "../Messages/SuccessOrError"

export default function FormEditarVentas({ valores }) {
    
    const { register, setValue, reset, handleSubmit } = useForm({
        resolver: yupResolver(schemaVentas),
        defaultValues: valores
    })

    const valoresVerdaderos = {
        producto: valores.producto.producto,
        cliente: valores.cliente.nombre_Completo,
        cantidad: valores.cantidad,
        precioTotal: valores.precioTotal,
        fecha: (valores.fecha).split("T")[0],
        modoDePago: valores.modoDePago,
        pendiente: valores.pendiente,
    }
    const handleSubmitAll = async (venta) => {
        venta.id = valores.id
        venta.cliente = JSON.parse(venta.cliente)
        venta.producto = JSON.parse(venta.producto)
        venta.precioTotal = Number(venta.precioTotal)
        venta.cantidad = Number(venta.cantidad)
        venta.fecha = (venta.fecha).split("T")[0]
        venta.cliente.user = null
        venta.producto.user = null
        venta.producto.categoria.user = null
        venta.tipoTransaccion = valores.tipoTransaccion
        await modificarVentaServicio(venta)
    }

    const { state: stateVentas } = useContext(VentasContext)
    const { isMoved, isMistake, modificarVentaServicio } = VentasServicios()
    const { state: stateClientes } = useContext(ClienteContext)
    const { state: stateProductos } = useContext(ProductoContext)

    useEffect(() => {

        reset(valoresVerdaderos)
        if (valores.producto) setValue('producto', JSON.stringify(valores.producto))
        if (valores.cliente) setValue('cliente', JSON.stringify(valores.cliente))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valores, reset, setValue])


    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full">

                <form
                    onSubmit={handleSubmit(handleSubmitAll)}
                    className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800 relative w-full"
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center mb-10">
                        Editar  venta
                    </h2>

                    {Object.entries(valoresVerdaderos)
                        .filter(valores => valores !== "id")
                        .map(([key, value]) => {
                            return key === "cliente" ? (
                                <div key={key}>
                                    <label htmlFor={key} className="text-sm uppercase font-bold" >{key}</label>
                                    <select
                                        {...register(key)}
                                        name={key}
                                        id={key}
                                        className="w-full p-3 border border-gray-100"
                                    >
                                        <option value={null}>Seleccione un cliente</option>
                                        {
                                            stateClientes.clientes.map(cliente => (
                                                <option className="text-black" key={cliente.id} value={JSON.stringify(cliente)}>
                                                    {cliente.nombre_Completo}
                                                </option>
                                            ))
                                        }


                                    </select>
                                </div>
                            ) : (
                                key === "producto" ?
                                    (
                                        <div>
                                            <label htmlFor={key} className="text-sm uppercase font-bold" >{key}</label>
                                            <select
                                                {...register(key)}
                                                name={key}
                                                id={key}
                                                className="w-full p-3 border border-gray-100"
                                            >
                                                <option value={null}>Seleccione un producto</option>
                                                {
                                                    stateProductos.productos.map(producto => (
                                                        <option className="text-black" key={producto.id} value={JSON.stringify(producto)}>
                                                            {producto.producto}
                                                        </option>
                                                    ))
                                                }


                                            </select>
                                        </div>
                                    )
                                    : (
                                        key === "pendiente" ?
                                            <>
                                                <select
                                                    {...register(key)}
                                                    id={key}
                                                    className="w-full p-3 border border-gray-100"
                                                >
                                                    <option value={true}>
                                                        Si
                                                    </option>
                                                    <option value={false}>
                                                        No
                                                    </option>
                                                </select>
                                            </> :
                                            <div>
                                                <label htmlFor={key} className="text-sm uppercase font-bold" >{key}</label>
                                                <input
                                                    {...register(key)}
                                                    className="w-full p-3 border border-gray-100"
                                                    type={key === "fecha" ? "date" : (typeof (value) === "string" ? "text" : (typeof (value) === "number" && "number"))}
                                                    placeholder={key}
                                                    name={key} id={key}
                                                />
                                            </div>)

                            )

                        })
                    }

                    <button
                        type="submit"
                        className="bg-fuchsia-950 w-full p-3 mb-2 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors"
                    >
                        EDITAR VENTA
                    </button>

                </form>

                {
                    stateVentas.mensajeError ?
                        <SuccessOrError message={stateVentas.mensajeError} severity={"error"} moved={isMistake} />
                        :
                        <SuccessOrError message={stateVentas.mensajeExito} severity={"success"} moved={isMoved} />
                }
            </div>
        </div>

    )
}