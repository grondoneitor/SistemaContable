import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: 'nombre_Completo', headerName: 'Nombre', flex: 1 },
    { field: 'mail', headerName: 'Mail', flex: 1 },
    { field: 'telefono', headerName: 'Telefono', flex: 1 },
    { field: 'direccion', headerName: 'Direccion', flex: 1 },
    { field: 'dni', headerName: 'DNI', flex: 1 },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

// eslint-disable-next-line react/prop-types
export default function TableClientes({clientes=[], rowSelectionModel, setRowSelectionModel, setValores}){
    const funcionParaSeleccionar = (newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
        if (newRowSelectionModel.length > 0) {
          const selectedRow = clientes.find(
            (cliente) => cliente.id === newRowSelectionModel[0]
          );
          setValores(selectedRow || {});
        } else {
          setValores({});
        }
      }
    return(
                <DataGrid
                  rows={clientes}
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
                    "& .MuiDataGrid-footerContainer": { 
                      borderBottomLeftRadius: "24px",
                      borderBottomRightRadius: "24px",
                      overflow: "hidden",
                    },
                    "& .MuiTablePagination-root": { 
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
        
    )
}