import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useContext, useMemo, useState } from 'react';
import { ClienteContext } from '../../context/cliente';
import { Box,  Modal, Toolbar, Tooltip, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import FormCrearCliente from './FormCrearCliente';
import { useClientes } from '../../hooks/clientes/useClientes';
import ServiciosCliente from '../../services/Clientes/clienteServicios';
import FormEditarCliente from './FormEditarClient';

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

  useClientes();
  const { state } = useContext(ClienteContext);
  const [open, setOpen] = useState(false);
  const varOpen = useMemo(() => open, [open]);
  const closeModal = () => {
    setOpen(false);
    setRowSelectionModel([])
  };
  
  const funcionParaSeleccionar = (newRowSelectionModel) =>{
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
      <h1 className="text-4xl m-7 font-bold">Clientes</h1>

      <Paper sx={{ height: 400 }}>
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
          rowSelectionModel={rowSelectionModel}
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
function  EnhancedTableToolbar({ setOpen, rowSelectionModel: rows = [], valores, setRowSelectionModel }) {
  const { BorrarCliente, isMoved } = ServiciosCliente()
  
  const [openEdit, setOpenEdit] = useState(false)
  
  const varOpenEdit = useMemo(()=> openEdit,[openEdit])
 
 
  const closeModalEdit = () =>{
    setOpenEdit(false)
    setRowSelectionModel([])
  }

  const abriendo = () => {
    setOpen(true);
    console.log("abriendo")
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
        alignItems: 'center',
      }}
    >
      <Tooltip 
         className='flex gap-4'
      >

          <FontAwesomeIcon onClick={abriendo} className='hover:cursor-pointer text-2xl' icon={faPlus} />

          {rows.length > 0 && <FontAwesomeIcon onClick={borrar} className='hover:cursor-pointer text-2xl' icon={faTrash} />}
        
          {rows.length === 1  && <FontAwesomeIcon onClick={editar} className='hover:cursor-pointer text-2xl' icon={faPen} />}
      
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
      <Modal
        open={varOpenEdit}
        onClose={closeModalEdit}
        className="flex items-center justify-center"
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          className="relative p-4 w-full max-w-xl rounded-lg"
        >
          <FormEditarCliente  valores={valores}  />
        </Box>
      </Modal>
    </Toolbar>
  );
}
