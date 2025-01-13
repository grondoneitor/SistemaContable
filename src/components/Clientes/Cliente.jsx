import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useContext, useMemo, useState } from 'react';
import { ClienteContext } from '../../context/cliente';
import { Box, IconButton, Modal, Toolbar, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FormCrearCliente from './FormCrearCliente';

const columns = [
  { field: 'nombre_Completo', headerName: 'Nombre', width: 200 },
  { field: 'mail', headerName: 'Mail', width: 250 },
  { field: 'telefono', headerName: 'Telefono', width: 130 },
  { field: 'direccion', headerName: 'Direccion', width: 200 },
  { field: 'dni', headerName: 'DNI', width: 130 },
];


const paginationModel = { page: 0, pageSize: 5 };

export default function Cliente() {
  const { state } = useContext(ClienteContext)
  const [open, setOpen] = useState(false)
  const varOpen = useMemo(()=> open,[open])
  const closeModal = ()=>{
    setOpen(false)
  }

  return (
    <>
      <h1 className='text-4xl m-7 font-bold'>Clientes</h1>

      <Paper sx={{ height: 400, width: '100%' }}>
        <EnhancedTableToolbar
        setOpen={setOpen}
        />
        <DataGrid
          rows={state.clientes}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableColumnResize
          disableColumnReorder
          disableColumnMenu
        />
      </Paper>
      <Modal
        open={varOpen}
        onClose={closeModal}
        className='flex items-center justify-center'
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          className="relative p-4 w-full max-w-xl rounded-lg"
        >
          <FormCrearCliente />
        </Box>
      </Modal>
    </>
  );
}


function EnhancedTableToolbar(props) {
  // eslint-disable-next-line react/prop-types
  const { setOpen } = props;
  const abriendo = () =>{
    setOpen(true)
  }
  return (
    <Toolbar
      sx={[{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }]}
    >
      <Link className="font-semibold">
        <Tooltip >
          <IconButton onClick={abriendo}>
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
        </Tooltip>
      </Link>
    </Toolbar>
  );
}