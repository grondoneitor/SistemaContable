import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useContext, useMemo, useState } from 'react';
import { Alert, Box, Modal, Toolbar, Tooltip, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFontAwesome, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductoContext } from '../../context/productos';
import FormCrearProducto from './FormCrearPro';
import { ServiciosProducto } from '../../services/Productos/productoServicios';
import FormEditarProducto from './FormEditarProducto';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, Outlet } from 'react-router-dom';
import { useMapeandoProductos } from '../../hooks/productos/useMapeandoProductos';
import { useMapeandoProductosPorNombre } from '../../hooks/productos/useMapeandoProductosPorNombre';
import { useMapeandoCategorias } from '../../hooks/categorias/useMapeandoCategorias';
const columns = [
  { field: 'producto', headerName: 'Producto', flex: 1 },
  { field: 'descripcion', headerName: 'Descripcion',  flex: 1 },
  { field: 'precio', headerName: 'Precio',  flex: 1},
  { field: 'stock', headerName: 'Stock',  flex: 1 },
  { field: 'stock_Min', headerName: 'Stock Mininmo', flex: 1 },
  { field: 'categoria', headerName: 'Categoria',  flex: 1},
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
},
{
  titulo: "Categoria",
  id: "categoria",
  placeholder: "Categoria del producto",
  type: "option"
}
]

const paginationModel = { page: 0, pageSize: 5 };

import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#ffffff',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInputLabel: { // 🔥 Aquí se cambia el color del label a blanco
        styleOverrides: {
          root: {
            color: 'white', // Color del label por defecto
          },
          focused: {
            color: 'white', // Color del label cuando el input está enfocado
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&::before, &::after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });



export default function FormProductos() {
  useMapeandoProductos()
  useMapeandoProductosPorNombre()
  useMapeandoCategorias()
  const { state } = useContext(ProductoContext);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)



  const modalCrearOpen = useMemo(() => open, [open]);
  const closeModalCrear = () => {
    setOpen(false);
    setRowSelectionModel([]);
  };

  const funcionParaSeleccionar = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    if (newRowSelectionModel.length > 0) {
      const selectedRow = state.productos.find(
        (producto) => producto.id === newRowSelectionModel[0]
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
      {/* <h1 className="text-4xl m-7 font-bold">Productos</h1>  */}

      <Paper sx={{ borderRadius: "24px", width: "100%" }}>
        <EnhancedTableToolbar
          setOpen={setOpen}
          rowSelectionModel={rowSelectionModel}
          valores={valores}
          modalCrearOpen={modalCrearOpen}
          setRowSelectionModel={setRowSelectionModel}
          setValores={setValores}
          setOpenEdit={setOpenEdit}
          openEdit={openEdit}
        />
        <DataGrid
          rows={
            state.productosBuscados.length > 0
              ? (state.productosBuscados
                ? state.productosBuscados.map((producto) => ({
                  ...producto,
                  categoria: producto.categoria ? producto.categoria.categoria : "No tiene categoria"
                }))
                : [])
              : state.productos
                ? state.productos.map((producto) => ({
                  ...producto,
                  categoria: producto.categoria ? producto.categoria.categoria : "No tiene categoria"
                }))
                : []
          }
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
          getRowId={(row) => row.id} // Usa el ID del producto
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={true}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            funcionParaSeleccionar(newRowSelectionModel)
          }}
          rowSelectionModel={rowSelectionModel}
          keepNonExistentRowsSelected
          disableRowSelectionOnClick
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
          className="relative  w-full max-w-xl rounded-lg overflow-hidden shadow-lg border-fuchsia-950 border-4"
        >
          <FormCrearProducto campos={campos} />
        </Box>
      </Modal>
      <Outlet />
    </>
  );
}

// eslint-disable-next-line react/prop-types
function EnhancedTableToolbar({ setOpen, rowSelectionModel: rows = [], valores, setRowSelectionModel, setValores, setOpenEdit, openEdit }) {

  const { borrarProductoServ, buscandoProductoServ, isMoved } = ServiciosProducto()

  const varOpenEdit = useMemo(() => openEdit, [openEdit])
  const closeModalEdit = () => {
    setOpenEdit(false);
    setTimeout(() => {
      setRowSelectionModel([]);
      setValores({});
    }, 0);
  };

  const abriendo = () => {
    setOpen(true);
  };

  const borrar = async () => {
    await borrarProductoServ(rows)
    setRowSelectionModel([]);
    setValores({});
  }

  const editar = () => {
    setOpenEdit(true);

  };

  const handleChange = (event) => {
    buscandoProductoServ(event.target.value)
  }

  const outerTheme = useTheme();

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
      <Tooltip
        className='flex gap-4 text-white'
      >
        <FontAwesomeIcon onClick={abriendo} className='hover:cursor-pointer text-2xl' icon={faPlus} />

        {rows.length > 0 && <FontAwesomeIcon onClick={borrar} className='hover:cursor-pointer text-2xl' icon={faTrash} />}

        {rows.length === 1 && <FontAwesomeIcon onClick={editar} className='hover:cursor-pointer text-2xl' icon={faPen} />}

      </Tooltip>
      <ThemeProvider theme={customTheme(outerTheme)}>

      <TextField
      className='text-white'
        label="Buscar..."
        variant="standard"
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "white" }} /> {/* Icono en blanco */}
            </InputAdornment>
          ),
        }}
        sx={{
          input: { color: "white" }, // Texto en blanco
          "& .MuiInput-underline:before": { borderBottomColor: "white" }, // Línea blanca antes de enfocar
          "& .MuiInput-underline:hover:before": { borderBottomColor: "white" }, // Línea blanca en hover
          "& .MuiInput-underline:after": { borderBottomColor: "white" }, // Línea blanca después de enfocar
        }}
      />

      </ThemeProvider>
 


      <Box
        className="flex gap-2"
      >
        <Link to={"categorias"}>
          <FontAwesomeIcon className='text-2xl' icon={faFontAwesome} />
        </Link>
        <Typography variant="subtitle1" sx={{ ml: 2 }} className='text-2xl'>
          {rows.length > 0
            ? `${rows.length} `
            : '-'}
        </Typography>
      </Box>


      <Modal
        open={varOpenEdit}
        onClose={closeModalEdit}
        className="flex items-center justify-center"
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          className="relative  w-full max-w-xl rounded-lg overflow-hidden shadow-lg border-fuchsia-950 border-4"
        >
          <FormEditarProducto valores={valores} />
        </Box>
      </Modal>
      <Alert
        variant="filled"
        severity="success"
        className={`transition-all duration-500 ease-linear w-64  right-5
                   ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                   fixed bottom-5 mt-10  h-16 flex justify-center items-center  `}
      >
        <p>Producto eliminado con exito</p>
      </Alert>
    </Toolbar>

    

  );
}
