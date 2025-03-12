import Paper from '@mui/material/Paper';
import { useContext, useRef, useState } from 'react';
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
import Opciones from '../Opciones';
import FiltroDeslizante from '../Filtros';


export default function Ventas() {

    useMapeandoVenta()
    useMapeandoProductos()
    useClientes()

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [valores, setValores] = useState(null)
    const { isMoved, isMistake, eliminarVentaServicio } = VentasServicios()

    const { state, filtroAddStart, filtroAddEnd } = useContext(VentasContext)
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openfilter, setOpenFilter] = useState(false)

    const startDateRef = useRef(null);
    const endDateRef = useRef(null);


    const ventas = state.ventas != null ? state.ventas.map(venta => ({
        ...venta,
        producto: capitalizeFirstLetter(venta.producto.producto),
        cliente: venta.cliente.nombre_Completo,
        fecha: (venta.fecha).split("T")[0]
    })) : []

    const handleChangeStart = (event) => {
        filtroAddStart(event.target.value)
    }
    const handleChangeEnd = (event) => {
        console.log(event.target.value)
        filtroAddEnd(event.target.value)
    }

    const handleClear = () => {
        // Limpiar las fechas
        if (startDateRef.current) {
            startDateRef.current.value = '';
            filtroAddStart("")
        }
        if (endDateRef.current) {
            endDateRef.current.value = '';
            filtroAddEnd("")
        }
    };
    return (
        <div className="w-full flex flex-col gap-6">
            <div className="bg-white w-full rounded-2xl p-6">


                <Paper sx={{  width: '100%' }}>

                    <Opciones
                        setOpen={setOpen}
                        setOpenEdit={setOpenEdit}
                        rowSelectionModel={rowSelectionModel}
                        setRowSelectionModel={setRowSelectionModel}
                        Borrar={eliminarVentaServicio}
                        setOpenFilter={setOpenFilter}
                        nombre="venta"
                    />
                    <FiltroDeslizante
                        open={openfilter}
                        setOpen={setOpenFilter}
                        Filtro={
                            <div className='flex flex-col '>
                                <label htmlFor="start" className='text-xl font-semibold'>Desde:</label>
                                <input className="bg-fuchsia-950 text-white p-2 mb-2 w-full" id="start" type="date" ref={startDateRef} onChange={handleChangeStart}  />
                                
                                <label htmlFor="end" className='text-xl font-semibold' >Hasta:</label>
                                <input className="bg-fuchsia-950 text-white p-2 mb-2  w-full" id="end" type="date" ref={endDateRef} onChange={handleChangeEnd} />
                                <button className='bg-gradient-to-br bg-[#d1c1f3] mt-2 p-2 font-bold'  onClick={handleClear}>Limpiar fechas</button>
                            </div>
                        } />
                    <Table
                        setRowSelectionModel={setRowSelectionModel}
                        setValores={setValores}
                        rowSelectionModel={rowSelectionModel}
                        rows={ventas}
                        columns={columns}
                        seleccionar={state.ventas}
                    />

                    <ModalAll open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} Componente={<FormCrearVentas campos={campos} />} />

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