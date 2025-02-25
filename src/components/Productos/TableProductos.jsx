import { DataGrid } from "@mui/x-data-grid"
import { ProductoContext } from "../../context/productos";
import { useContext } from "react";

const columns = [
    { field: 'producto', headerName: 'Producto', flex: 1 },
    { field: 'descripcion', headerName: 'Descripcion', flex: 1 },
    { field: 'precio', headerName: 'Precio', flex: 1 },
    { field: 'stock', headerName: 'Stock', flex: 1 },
    { field: 'stock_Min', headerName: 'Stock Mininmo', flex: 1 },
    { field: 'categoria', headerName: 'Categoria', flex: 1 },
  ];
const paginationModel = { page: 0, pageSize: 5 };
  
// eslint-disable-next-line react/prop-types
export default function TableProductos({setRowSelectionModel, setValores, rowSelectionModel}) {
    const { state } = useContext(ProductoContext);

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

    return (
        <DataGrid
            rows=
            {
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
            }
        }

            getRowId={(row) => row.id} // Usa el ID del producto
            columns={columns}
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

    )
}