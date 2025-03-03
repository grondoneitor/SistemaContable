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
import Encabezado from '../Encabezado';
import ServiciosCliente from '../../services/Clientes/clienteServicios';



export default function Cliente() {
  useClientes();
  const { state } = useContext(ClienteContext);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)

  const { BorrarCliente, isMoved, isMistake } = ServiciosCliente()

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [valores, setValores] = useState({})


  const clientesRefactorizado = state.clientes.map(cliente => ({
    ...cliente,
    nombre_Completo: capitalizeFirstLetter(cliente.nombre_Completo)

  }))


  return (
    <div className="bg-white rounded-2xl p-6 w-full" >
      <Paper sx={{ borderRadius: "24px", width: "100%" }} >
        <Encabezado
          setOpen={setOpen}
          setOpenEdit={setOpenEdit}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          Borrar={BorrarCliente}
          isMoved={isMoved}
          isMistake={isMistake}
          state={state}
        />
        {/* <Encabezado
          setOpen={setOpen}
          setOpenEdit={setOpenEdit}
          rowSelectionModel={rowSelectionModel}
        /> */}
        {/* Encabezado({setOpen, setOpenEdit, rowSelectionModel: rows = [],  Borrar, isMoved, isMistake,state=[]  }) */}
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

    </div>
  );
}
