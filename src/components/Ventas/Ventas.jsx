import Paper from '@mui/material/Paper';
import EncabezadoTablaVentas from '../Ventas/EncabezadoTablaVentas';
import { useContext, useState } from 'react';
import { VentasContext } from '../../context/ventas';
import useMapeandoVenta from '../../hooks/ventas/useMapeandoVentas';
import { capitalizeFirstLetter } from '../../services/mayusculaPrimeraLetra';
import { useMapeandoProductos } from '../../hooks/productos/useMapeandoProductos';
import { useClientes } from '../../hooks/clientes/useClientes';
import Table from '../Table';
import ModalAll from '../Modal';
import FormCrearVentas from './FormCrearVentas';
import { campos, columns } from './constantes';
import FormEditarVentas from './FormEditarVentas';
import { SuccessOrError } from '../Messages/SuccessOrError';
import VentasServicios from '../../services/Ventas/ventasServicios';


export default function Ventas() {

    const { state } = useContext(VentasContext)
    useMapeandoVenta()
    useMapeandoProductos()
    useClientes()

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [valores, setValores] = useState(null)
    const { isMoved, isMistake } = VentasServicios()


    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const ventas = state.ventas.map(venta => ({
        ...venta,
        producto: capitalizeFirstLetter(venta.producto.producto),
        cliente: venta.cliente.nombre_Completo,
        fecha: (venta.fecha).split("T")[0]
    }))

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="bg-white w-full rounded-2xl p-6">
                <Paper sx={{ borderRadius: "24px", width: '100%' }}>

                    <EncabezadoTablaVentas
                        rowSelectionModel={rowSelectionModel}
                        setRowSelectionModel={setRowSelectionModel}
                        setOpenEdit={setOpenEdit}
                        setOpen={setOpen}
                    />

                    <Table
                        setRowSelectionModel={setRowSelectionModel}
                        setValores={setValores}
                        rowSelectionModel={rowSelectionModel}
                        rows={ventas}
                        columns={columns}
                        seleccionar={state.ventas}
                    />

                    {/* modal crear */}
                    <ModalAll open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} Componente={<FormCrearVentas campos={campos} />} />

                    {/* modal editar */}
                    <ModalAll open={openEdit} setOpen={setOpenEdit} setRowSelectionModel={setRowSelectionModel} Componente={<FormEditarVentas valores={valores} />} />

                    {
                        state.mensajeError ?
                            <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
                            :
                            <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />
                    }
                </Paper>
            </div>
        </div>
    );
}