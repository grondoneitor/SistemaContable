import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useContext, useMemo, useState } from 'react';
import { Box, IconButton, Modal, Toolbar, Tooltip, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductoContext } from '../../context/productos';
import { useMapeandoProductos } from '../../hooks/productos/useMapeandoProductos';
import FormCrearProducto from './FormCrearPro';
import { ServiciosProducto } from '../../services/Productos/productoServicios';
import FormEditarProducto from './FormEditarProducto';
const columns = [
  { field: 'producto', headerName: 'Producto', width: 200 },
  { field: 'descripcion', headerName: 'Descripcion', width: 250 },
  { field: 'precio', headerName: 'Precio', width: 130 },
  { field: 'stock', headerName: 'Stock', width: 200 },
  { field: 'stock_Min', headerName: 'Stock Mininmo', width: 130 }
  // ,{ field: 'categoria', headerName: 'Categoria', width: 130 },
];


const campos = [{
  titulo: "Producto",
  id: "producto",
  placeholder: "Nombre del producto",
  type: "text"
},
{
  titulo: "Descripcion",
  id: "descripcion",
  placeholder: "Descripcion del producto",
  type: "text"
},
{
  titulo: "Precio",
  id: "precio",
  placeholder: "Precio del producto",
  type: "number"
},
{
  titulo: "Stock",
  id: "stock",
  placeholder: "Stock del producto",
  type: "number"
},
{
  titulo: "Stock Minimo",
  id: "stock_Min",
  placeholder: "Stock minimo del producto",
  type: "number"
}
// ,{
//     titulo: "Categoria",
//     id: "categoria",
//     placeholder:"Categoria del producto",
//     type: "option"
// }
]

const paginationModel = { page: 0, pageSize: 5 };



export default function Productos() {
  useMapeandoProductos()

  const { state } = useContext(ProductoContext);
  const [open, setOpen] = useState(false);

   const modalCrearOpen = useMemo(() => open, [open]);
   const closeModalCrear = () => {
     setOpen(false);
  };
  
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [valores, setValores] = useState({})

  return (
    <>
       {/* <h1 className="text-4xl m-7 font-bold">Productos</h1>  */}

       <Paper sx={{ height: 400 }}>
        <EnhancedTableToolbar
           setOpen={setOpen}
           rowSelectionModel={rowSelectionModel}
           valores={valores}
           modalCrearOpen={modalCrearOpen}
        /> 
         <DataGrid
          rows={state.productos}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
             setRowSelectionModel(newRowSelectionModel);
             if (newRowSelectionModel.length > 0) {
               const selectedRow = state.productos.find(
                 (producto) => producto.id === newRowSelectionModel[0]
               );
               setValores(selectedRow || {}); 
             } else {
               setValores({}); 
             }
           }}
          disableColumnResize
          disableColumnReorder
          disableColumnMenu
        /> 
     </Paper> 

       <Modal
        open={modalCrearOpen}
        onClose={closeModalCrear}
        className="flex items-center justify-center"
      > 
         <Box
          onClick={(e) => e.stopPropagation()}
          className="relative p-4 w-full max-w-xl rounded-lg"
        > 
          <FormCrearProducto campos={campos} />
         </Box> 
      </Modal> 

    </>
  );
}

// eslint-disable-next-line react/prop-types
function  EnhancedTableToolbar({ setOpen, rowSelectionModel: rows = [], valores }) {
   const { borrarProductoServ, isMoved } = ServiciosProducto()
   console.log(rows, " seleccionados")
  const [openEdit, setOpenEdit] = useState(false)
  
  const varOpenEdit = useMemo(()=> openEdit,[openEdit])
 
 
  const closeModalEdit = () =>{
    setOpenEdit(false)
  }

  const abriendo = () => {
    setOpen(true);
    console.log("abriendo")
  };

  const borrar = async () => {
     await borrarProductoServ(rows)
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
      <Tooltip>

        <IconButton onClick={abriendo}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>

        <IconButton onClick={borrar}>
          {rows.length > 0 && <FontAwesomeIcon icon={faTrash} />}
        </IconButton>
        
        <IconButton onClick={editar}  >
          {rows.length === 1  && <FontAwesomeIcon icon={faPen} />}
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
        <p>Producto/s borrados con exito</p>
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
           <FormEditarProducto  valores={valores}  rows={rows}  /> 
        </Box>
      </Modal>
    </Toolbar>
  );
}
