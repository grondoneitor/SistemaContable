import { useContext, useState } from 'react';
import { ProveedoresContext } from '../../context/proveedores';
import useMapeandoProveedores from '../../hooks/proveedores/useMapProveedores';
import { Paper } from '@mui/material';
import { capitalizeFirstLetter } from '../../services/mayusculaPrimeraLetra';
import { camposProveedores, columnsProveedores } from './constantesProveedores';
import Opciones from '../Opciones';
import Table from '../Table';
import FormCrearProveedor from './FormCrearProveedor';
import FormEditarProveedor from './FormEditarProveedor';
import ModalAll from '../Modal';
import { SuccessOrError } from '../Messages/SuccessOrError';
import { ServiciosProveedores } from '../../services/Proveedor/proveedorServicios';


export default function Proveedores() {
    useMapeandoProveedores()
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)

    const { eliminarProveedorServ, isMoved, isMistake } = ServiciosProveedores()

    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [valores, setValores] = useState({})
    const { state } = useContext(ProveedoresContext);

    const rows = state.proveedores
        ? state.proveedores.map((proveedor) => ({
            ...proveedor,
            nombre: capitalizeFirstLetter(proveedor.nombre)
        }))
        : []

    console.log(state.mensajeExito)
    return (
        <div className="bg-white rounded-2xl p-6 w-full" >
            <div className='flex justify-between w-full'>

                <Opciones
                    setOpen={setOpen}
                    setOpenEdit={setOpenEdit}
                    rowSelectionModel={rowSelectionModel}
                    setRowSelectionModel={setRowSelectionModel}
                    Borrar={eliminarProveedorServ}
                    setOpenFilter={setOpenFilter}
                    nombre="proveedores"
                />

                {/* <FiltroDeslizante
               open={openFilter}
               setOpen={setOpenFilter}
             /> */}

            </div>
            <Paper sx={{ width: "100%" }}>
                <Table
                    setRowSelectionModel={setRowSelectionModel}
                    setValores={setValores}
                    rowSelectionModel={rowSelectionModel}
                    rows={rows}
                    columns={columnsProveedores}
                    seleccionar={state.proveedores}
                />
            </Paper>


            <ModalAll open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} Componente={<FormCrearProveedor campos={camposProveedores} />} />
            <ModalAll open={openEdit} setOpen={setOpenEdit} setRowSelectionModel={setRowSelectionModel} Componente={<FormEditarProveedor valores={valores} />} />

            {
                state.mensajeError ?
                    <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
                    :
                    <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />

            }
        </div>
    );
}
