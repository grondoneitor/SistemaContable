import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EncabezadoTablaVentas from '../Ventas/EncabezadoTablaVentas';
import { useContext, useState } from 'react';
import { VentasContext } from '../../context/ventas';
import useMapeandoVenta from '../../hooks/ventas/useMapeandoVentas';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'producto', headerName: 'Producto', width: 130 },
  { field: 'cliente', headerName: 'Cliente', width: 130 },
  {
    field: 'cantidad',
    headerName: 'Cantidad',
    type: 'number',
    width: 90,
  },
  { field: 'precioTotal', headerName: 'Precio total', width: 130 },
  { field: 'fecha', headerName: 'Fecha', width: 130 },
  { field: 'modoDePago', headerName: 'Modo de pago', width: 130 },
  { field: 'pendiente', headerName: 'Pendiente', width: 130 }
];


const paginationModel = { pcantidad: 0, pcantidadSize: 5 };

export default function Ventas() {

    const {state} = useContext(VentasContext)
    useMapeandoVenta()
    
    const [rowSelectionModel, setRowSelectionModel] = useState(null)
    const [valores, setValores] = useState(null)
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

    const [open, setOpen ] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)


const clientes = state.ventas.map(venta =>({
    ...venta,
    producto: venta.producto.producto,
    cliente: venta.cliente.nombre_Completo
}))

    return (
    <Paper sx={{ height: 400, width: '100%' }}>

      <DataGrid
        rows={clientes}
        columns={columns}
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
        }
        }

        getRowId={(row) => row.id} 
        initialState={{ pagination: { paginationModel } }}
        rowsPerPageOptions
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
  );
}