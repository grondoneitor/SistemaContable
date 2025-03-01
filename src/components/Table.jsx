import { DataGrid } from "@mui/x-data-grid"


const paginationModel = { page: 0, pageSize: 5 };

// eslint-disable-next-line react/prop-types
export default function Table({rows,columns ,seleccionar =[] ,setRowSelectionModel, setValores, rowSelectionModel }) {

    const funcionParaSeleccionar = (newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
        if (newRowSelectionModel.length > 0) {
            const selectedRow = seleccionar.find(
                (elemento) => elemento.id === newRowSelectionModel[0]
            );
            setValores(selectedRow || {});
        } else {
            setValores({});

        }
    }
    
    

    return (
        <DataGrid
            rows={rows}
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