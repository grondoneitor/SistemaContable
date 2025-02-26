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
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white w-full rounded-2xl p-6">
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
      </div>

      {/* Aquí está el Outlet, ajustado dinámicamente */}
      <div className=" ">
        <div className="  w-2/6 ">
          <Outlet className="w-full" />
        </div>
      </div>
    </div>
  );
}
