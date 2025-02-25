import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: 'categoria', headerName: 'Categoria', flex: 1 }
];

const paginationModel = { page: 0, pageSize: 5 };


// eslint-disable-next-line react/prop-types
export default function TableCategorias({ categorias, rowSelectionModel, setRowSelectionModel, setValores }) {
    const funcionParaSeleccionar = (newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
        if (newRowSelectionModel.length > 0) {
            // eslint-disable-next-line react/prop-types
            const selectedRow = categorias.find(
                (categoria) => categoria.id_Categoria === newRowSelectionModel[0]
            );
            setValores(selectedRow || {});
        } else {
            setValores({});
        }
    }

    return (
        <DataGrid
            rows={categorias}
            columns={columns}
            className="w-auto display inline-block"
            pageSize={paginationModel.pageSize}
            getRowId={(row) => row.id_Categoria}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
                funcionParaSeleccionar(newRowSelectionModel);
            }}
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
            rowSelectionModel={rowSelectionModel}
            disableColumnResize
            disableColumnReorder
            disableColumnMenu
        />
    )
}