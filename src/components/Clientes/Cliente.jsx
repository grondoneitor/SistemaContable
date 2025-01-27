import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useContext, useMemo, useState } from 'react';
import { ClienteContext } from '../../context/cliente';
import { Box, IconButton, Modal, Toolbar, Tooltip, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import FormCrearCliente from './FormCrearCliente';
import { useClientes } from '../../hooks/clientes/useClientes';
import ServiciosBorrarCliente from '../../services/Clientes/borrarCliente';
const columns = [
  { field: 'nombre_Completo', headerName: 'Nombre', width: 200 },
  { field: 'mail', headerName: 'Mail', width: 250 },
  { field: 'telefono', headerName: 'Telefono', width: 130 },
  { field: 'direccion', headerName: 'Direccion', width: 200 },
  { field: 'dni', headerName: 'DNI', width: 130 },
];
const campos = [{
  titulo: "Nombre",
  id: "nombre",
  placeholder: "Nombre del cliente",
  type: "text"
},
{
  titulo: "Mail",
  id: "mail",
  placeholder: "Mail del cliente",
  type: "email"
},
{
  titulo: "Telefono",
  id: "telefono",
  placeholder: "Telefono del cliente",
  type: "text"
},
{
  titulo: "Direccion",
  id: "direccion",
  placeholder: "Direccion del cliente",
  type: "text"
},
{
  titulo: "DNI",
  id: "dni",
  placeholder: "DNI del cliente",
  type: "text"
}
]

const paginationModel = { page: 0, pageSize: 5 };



export default function Cliente() {
  // const [selectionRow, setSelectionRow] = useState([]); // IDs seleccionados

  useClientes();
  const { state } = useContext(ClienteContext);
  const [open, setOpen] = useState(false);
  const varOpen = useMemo(() => open, [open]);
  const closeModal = () => {
    setOpen(false);
  };

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleClick = (rowSelectionModel) => {
    console.log(rowSelectionModel);
  };


  return (
    <>
      <h1 className="text-4xl m-7 font-bold">Clientes</h1>

      <Paper sx={{ height: 400 }}>
        <EnhancedTableToolbar
          setOpen={setOpen}
          rowSelectionModel={rowSelectionModel}
        />
        <DataGrid
          rows={state.clientes}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          onClick={handleClick(rowSelectionModel)}
          disableColumnResize
          disableColumnReorder
          disableColumnMenu
        />
      </Paper>

      <Modal
        open={varOpen}
        onClose={closeModal}
        className="flex items-center justify-center"
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          className="relative p-4 w-full max-w-xl rounded-lg"
        >
          <FormCrearCliente campos={campos} />
        </Box>
      </Modal>

    </>
  );
}

// eslint-disable-next-line react/prop-types
function EnhancedTableToolbar({ setOpen, rowSelectionModel: rows = [] }) {
  const { BorrarCliente, isMoved } = ServiciosBorrarCliente()
  const abriendo = () => {
    setOpen(true);
    console.log("abriendo")
  };

  const borrar = async () => {
    await BorrarCliente(rows)
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Tooltip>
        <IconButton onClick={abriendo}>
          <FontAwesomeIcon icon={faPlus} />

        </IconButton>
        <IconButton onClick={borrar}>
          {rows.length > 0 && <FontAwesomeIcon icon={faTrash} />}
        </IconButton>
      </Tooltip>
      <Typography variant="subtitle1" sx={{ ml: 2 }}>
        {rows.length > 0
          ? `${rows.length} seleccionados`
          : 'No hay filas seleccionadas'}
      </Typography>
      <div
        className={`transition-all duration-500 ease-linear  right-5
                     ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                     fixed bottom-5 mt-10 w-60 h-16 flex justify-center items-center bg-green-600 text-white shadow-lg rounded-lg`}
      >
        <p>Cliente/s borrados con exito</p>
      </div>
    </Toolbar>
  );
}
