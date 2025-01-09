import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { ClienteContext } from '../../context/cliente';

const columns = [
  { field: 'nombre_Completo', headerName: 'Nombre', width: 130 },
  { field: 'mail', headerName: 'mail', width: 250 },
  { field: 'telefono', headerName: 'telefono', width: 130 },
  { field: 'direccion', headerName: 'direccion', width: 200 },
  { field: 'dni', headerName: 'DNI', width: 130 },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Cliente() {
    const {state} = useContext(ClienteContext)
    console.log(state.clientes)
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={state.clientes}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}