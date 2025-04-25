import { useContext, useState } from 'react';
import { ComprasContext } from '../../context/compras';
import useMapeandoCompra from '../../hooks/compras/useMapeandoCompras';
import { capitalizeFirstLetter } from '../../services/mayusculaPrimeraLetra';
import Opciones from '../Opciones';
import { Paper } from '@mui/material';
import Table from '../Table';
import { campos, columns } from './constantesCompras';
import ModalAll from '../Modal'
import { SuccessOrError } from '../Messages/SuccessOrError';
import FormCrearCompras from './FormCrearCompras';
import FormEditarCompras from './FormEditarCompras';
import ComprasServicios from '../../services/Compras/ComprasServicios.js';
import { useMapeandoProductos } from '../../hooks/productos/useMapeandoProductos.js';
import useMapeandoProveedores from '../../hooks/proveedores/useMapProveedores.js';

export default function Compras() {

    useMapeandoCompra()
    useMapeandoProveedores()
    useMapeandoProductos()

    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [valores, setValores] = useState(null)
    const {   isMoved, isMistake, eliminarCompraServicio  } = ComprasServicios()

    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openfilter, setOpenFilter] = useState(false)


    const { state } = useContext(ComprasContext)
    // console.log(state.compras)
    const compras = state.compras != null ? state.compras.map(compra => ({
        ...compra,
        producto: capitalizeFirstLetter(compra.producto.producto),
        proveedores: compra.proveedores.nombre,
        fecha: (compra.fecha).split("T")[0]
    })) : []


    return (
        <div className="w-full flex flex-col gap-6">
            <div className="bg-white w-full rounded-2xl p-6">


                <Paper sx={{ width: '100%' }}>

                    <Opciones
                        setOpen={setOpen}
                        setOpenEdit={setOpenEdit}
                        rowSelectionModel={rowSelectionModel}
                        setRowSelectionModel={setRowSelectionModel}
                        Borrar={eliminarCompraServicio}
                        setOpenFilter={setOpenFilter}
                        nombre="compra"
                    />
                    {/* <FiltroDeslizante
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
                        } /> */}
                    <Table
                        setRowSelectionModel={setRowSelectionModel}
                        setValores={setValores}
                        rowSelectionModel={rowSelectionModel}
                        rows={compras}
                        columns={columns}
                        seleccionar={state.compras}
                    />

                   <ModalAll open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} Componente={<FormCrearCompras campos={campos}/>} />

                    <ModalAll open={openEdit} setOpen={setOpenEdit} setRowSelectionModel={setRowSelectionModel} Componente={<FormEditarCompras valores={valores} />} />

                    {
                        state.mensajeError ?
                            <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
                            :
                            <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />
                    } 
                </Paper>
            </div>
        </div>);
}