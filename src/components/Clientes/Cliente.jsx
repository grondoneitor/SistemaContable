/* eslint-disable react/prop-types */
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useContext, useMemo, useState } from 'react';
import { ClienteContext } from '../../context/cliente';
import { Alert, Box, Modal, Toolbar, Tooltip, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import FormCrearCliente from './FormCrearCliente';
import { useClientes } from '../../hooks/clientes/useClientes';
import ServiciosCliente from '../../services/Clientes/clienteServicios';
import FormEditarCliente from './FormEditarClient';

const columns = [
  { field: 'nombre_Completo', headerName: 'Nombre', flex: 1 },
  { field: 'mail', headerName: 'Mail', flex: 1 },
  { field: 'telefono', headerName: 'Telefono', flex: 1 },
  { field: 'direccion', headerName: 'Direccion', flex: 1 },
  { field: 'dni', headerName: 'DNI', flex: 1 },
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
  useClientes();
  const { state } = useContext(ClienteContext);
  const [open, setOpen] = useState(false);
  const varOpen = useMemo(() => open, [open]);
  const closeModal = () => {
    setOpen(false);
    setRowSelectionModel([])
  };

  const funcionParaSeleccionar = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    if (newRowSelectionModel.length > 0) {
      const selectedRow = state.clientes.find(
        (cliente) => cliente.id === newRowSelectionModel[0]
      );
      setValores(selectedRow || {});
    } else {
      setValores({});
    }
  }

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [valores, setValores] = useState({})

  return (
    <>
      {/* <h1 className="text-4xl m-4 font-bold">Clientes</h1>  */}
      <Paper sx={{ borderRadius: "24px", width: "100%" }} >
        <EnhancedTableToolbar
          setOpen={setOpen}
          rowSelectionModel={rowSelectionModel}
          valores={valores}
          setRowSelectionModel={setRowSelectionModel}
        />
        <DataGrid
          rows={state.clientes}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            funcionParaSeleccionar(newRowSelectionModel)
          }}
          sx={{
            boxShadow: 2,
            border: "none",
            width: "100%",
            justifyItems: "space-between",
            borderRadius: "0px 0px 24px 24px",
            "& .MuiDataGrid-footerContainer": { // Contenedor de paginación en DataGrid
              borderBottomLeftRadius: "24px",
              borderBottomRightRadius: "24px",
              overflow: "hidden",
            },
            "& .MuiTablePagination-root": { // Estilos de la paginación
              backgroundColor: "#f0f0f0",
              color: "black",
              borderBottomLeftRadius: "24px",
              borderBottomRightRadius: "24px",
            },
            "& .MuiTablePagination-actions button": {
              color: "black",
            },
          }}
          pagination
          className='rounded-t-3xl'
          rowSelectionModel={rowSelectionModel}
          disableColumnResize
          disableColumnReorder
          disableColumnMenu
        />

      </Paper>

      <Modal
        open={varOpen}
        onClose={closeModal}
        className="flex items-center justify-center "
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          className="relative  w-full max-w-xl rounded-lg overflow-hidden shadow-lg border-fuchsia-950 border-4"
        >
          <FormCrearCliente campos={campos} />
        </Box>
      </Modal>
    </>
  );
}

function EnhancedTableToolbar({ setOpen, rowSelectionModel: rows = [], valores, setRowSelectionModel }) {
  const { BorrarCliente, isMoved } = ServiciosCliente()

  const [openEdit, setOpenEdit] = useState(false)

  const varOpenEdit = useMemo(() => openEdit, [openEdit])

  const closeModalEdit = () => {
    setOpenEdit(false)
    setRowSelectionModel([])
  }

  const abriendo = () => {
    setOpen(true);
  };

  const borrar = async () => {
    await BorrarCliente(rows)
  }

  const editar = async () => {
    setOpenEdit(true);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      className='bg-fuchsia-950 text-white rounded-t-3xl'
    >
      <Tooltip className='flex gap-4 text-white'>
        <FontAwesomeIcon onClick={abriendo} className='hover:cursor-pointer text-2xl text-white' icon={faPlus} />
        {rows.length > 0 && <FontAwesomeIcon onClick={borrar} className='hover:cursor-pointer text-2xl text-white' icon={faTrash} />}
        {rows.length === 1 && <FontAwesomeIcon onClick={editar} className='hover:cursor-pointer text-2xl text-white' icon={faPen} />}
      </Tooltip>

      <Typography sx={{ ml: 2, fontSize: "18px", marginRight: "5px" }} >
        {rows.length > 0 ? `${rows.length}` : '-'}
      </Typography>

      <Modal
        open={varOpenEdit}
        onClose={closeModalEdit}
        className="flex items-center justify-center"
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          className="relative  w-full max-w-xl rounded-lg overflow-hidden shadow-lg border-fuchsia-950 border-4"
        >
          <FormEditarCliente valores={valores} />
        </Box>
      </Modal>
      <Alert
      variant="filled"
        severity="success"
        className={`transition-all duration-500 ease-linear w-64  right-5
                     ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                     fixed bottom-5 mt-10  h-16 flex justify-center items-center  `}
      >
        <p>Cliente/s borrados con exito</p>
      </Alert>
    </Toolbar>
  );
}
