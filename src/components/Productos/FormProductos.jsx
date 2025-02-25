import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMapeandoProductos } from '../../hooks/productos/useMapeandoProductos';
import { useMapeandoProductosPorNombre } from '../../hooks/productos/useMapeandoProductosPorNombre';
import { useMapeandoCategorias } from '../../hooks/categorias/useMapeandoCategorias';
import EncabezadoTableProductos from './EncabezadoTableProductos';
import TableProductos from './TableProductos';
import ModalCrearProductos from './ModalCrearProductos';


export default function FormProductos() {
  useMapeandoProductos()
  useMapeandoProductosPorNombre()
  useMapeandoCategorias()
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [valores, setValores] = useState({})

  return (
    <>

      <Paper sx={{ borderRadius: "24px", width: "100%" }}>
        <EncabezadoTableProductos
          setOpen={setOpen}
          rowSelectionModel={rowSelectionModel}
          valores={valores}
          setRowSelectionModel={setRowSelectionModel}
          setOpenEdit={setOpenEdit}
          openEdit={openEdit}
        />

        <TableProductos
          setRowSelectionModel={setRowSelectionModel}
          setValores={setValores}
          rowSelectionModel={rowSelectionModel}

        />

      </Paper>

      <ModalCrearProductos open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} />
      <Outlet />
    </>
  );
}
