import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useUltimasTransacciones } from '../../hooks/ultimasTransacciones/useUltimasTransacciones';
import { useContext } from 'react';
import { UltimasTransaccionesContext } from '../../context/ultimasTransacciones';
import { columns } from './constantesDashBoard';


const paginationModel = { page: 0, pageSize: 5 };

export default function UltimasTransacciones() {
  useUltimasTransacciones()
  const { state } = useContext(UltimasTransaccionesContext)

  const rows = state.transacciones.map(trans => ({
    ...trans,
    fecha: (trans.fecha).split("T")[0]

  })
  )

  return (
    <Paper sx={{ }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
  
        autoHeight
        sx={{
          border: "none",
          width: "100%",
          justifyItems: "space-between",
          marginBottom: "50px",
          "& .MuiDataGrid-footerContainer": { // Contenedor de paginación en DataGrid
            overflow: "hidden",
            marginBottom:"50px" ,
          },
          "& .MuiTablePagination-root": { // Estilos de la paginación
           
            backgroundColor: "#f0f0f0",
            color: "black"
          },
          "& .MuiTablePagination-actions button": {
            color: "black",
            
          },
          "& .compra": { backgroundColor: "#FFCDD2 !important" },
          "& .venta": { backgroundColor: "#C8E6C9 !important" },
          "& .MuiDataGrid-cell:hover": {
            backgroundColor: "inherit !important",
            pointerEvents: "none"
          }
        }
        }
        getRowClassName={(params) =>
          params.row.id.startsWith("C-") ? "compra" : "venta"
        }
        disableColumnResize
        disableColumnReorder
        disableColumnMenu
      />

    </Paper>

  );
}