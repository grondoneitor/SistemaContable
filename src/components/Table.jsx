import { DataGrid } from "@mui/x-data-grid"


const paginationModel = { page: 0, pageSize: 5 };

// eslint-disable-next-line react/prop-types
export default function Table({rows,columns ,seleccionar =[] ,setRowSelectionModel ,setValores, rowSelectionModel }) {

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