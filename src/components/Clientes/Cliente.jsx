import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import { ClienteContext } from '../../context/cliente';
import { useClientes } from '../../hooks/clientes/useClientes';
import EncabezadoTablaClientes from './EncabezadoTablaClientes';
import TableClientes from './TableClientes';
import ModalCrearCliente from './ModalCrearCliente';



export default function Cliente() {
  useClientes();
  const { state } = useContext(ClienteContext);
  const [open, setOpen] = useState(false);


  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [valores, setValores] = useState({})

  return (
    <>
      {/* <h1 className="text-4xl m-4 font-bold">Clientes</h1>  */}
      <Paper sx={{ borderRadius: "24px", width: "100%" }} >
        <EncabezadoTablaClientes
          setOpen={setOpen}
          rowSelectionModel={rowSelectionModel}
          valores={valores}
          setRowSelectionModel={setRowSelectionModel}
        />
        <TableClientes
          clientes={state.clientes}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          setValores={setValores}

        />

      </Paper>

      <ModalCrearCliente open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} />

    </>
  );
}
