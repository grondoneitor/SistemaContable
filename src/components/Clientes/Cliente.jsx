import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import { ClienteContext } from '../../context/cliente';
import { useClientes } from '../../hooks/clientes/useClientes';
import ModalAll from '../Modal';
import FormEditarCliente from './FormEditarCliente';
import FormCrearCliente from './FormCrearCliente';
import { camposClientes, columnsClientes } from './constantesClientes';
import { capitalizeFirstLetter } from '../../services/mayusculaPrimeraLetra';
import Table from '../Table';
import ServiciosCliente from '../../services/Clientes/clienteServicios';
import FiltroDeslizante from '../Filtros';
import Opciones from '../Opciones';
import { SuccessOrError } from '../Messages/SuccessOrError';



export default function Cliente() {
  useClientes();
  const { state } = useContext(ClienteContext);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)

  const { BorrarCliente, isMoved, isMistake } = ServiciosCliente()

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [valores, setValores] = useState({})


  const clientesRefactorizado = state.clientes.map(cliente => ({
    ...cliente,
    nombre_Completo: capitalizeFirstLetter(cliente.nombre_Completo)

  }))

  return (
    <div className="bg-white rounded-2xl p-6 w-full" >
      <div className='flex justify-between w-full'>

        <Opciones
          setOpen={setOpen}
          setOpenEdit={setOpenEdit}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          Borrar={BorrarCliente}
          setOpenFilter={setOpenFilter}
          nombre="cliente"
        />

        <FiltroDeslizante
          open={openFilter}
          setOpen={setOpenFilter}
        />

      </div>

      <Paper sx={{ width: "100%" }} >
        <Table
          seleccionar={state.clientes}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          setValores={setValores}
          rows={clientesRefactorizado}
          columns={columnsClientes}
        />

      </Paper>

      <ModalAll open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} Componente={<FormCrearCliente campos={camposClientes} />} />
      <ModalAll open={openEdit} setOpen={setOpenEdit} setRowSelectionModel={setRowSelectionModel} Componente={<FormEditarCliente valores={valores} />} />

      {
        state.mensajeError ?
          <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
          :
          <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />

      }
    </div>
  );
}
