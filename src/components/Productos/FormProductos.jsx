import Paper from '@mui/material/Paper';
import {  useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMapeandoProductos } from '../../hooks/productos/useMapeandoProductos';
import { useMapeandoProductosPorNombre } from '../../hooks/productos/useMapeandoProductosPorNombre';
import { useMapeandoCategorias } from '../../hooks/categorias/useMapeandoCategorias';
import EncabezadoTableProductos from './EncabezadoTableProductos';
import { capitalizeFirstLetter } from '../../services/mayusculaPrimeraLetra';
import { useContext } from 'react';
import { ProductoContext } from '../../context/productos';
import Table from '../Table';
import ModalAll from '../Modal';
import FormCrearProducto from './FormCrearPro';
import { campos, columns } from './constantesProductos';
import FormEditarProducto from './FormEditarProducto';



export default function FormProductos() {
  useMapeandoProductos()
  useMapeandoProductosPorNombre()
  useMapeandoCategorias()
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [valores, setValores] = useState({})
  const { state } = useContext(ProductoContext)

  const rows = state.productosBuscados.length > 0
    ? (state.productosBuscados
      ? state.productosBuscados.map((producto) => ({
        ...producto,
        producto: capitalizeFirstLetter(producto.producto),
        categoria: producto.categoria ? capitalizeFirstLetter(producto.categoria.categoria) : "No tiene categoria"
      }))
      : [])
    : state.productos
      ? state.productos.map((producto) => ({
        ...producto,
        producto: capitalizeFirstLetter(producto.producto),
        categoria: producto.categoria ? capitalizeFirstLetter(producto.categoria.categoria) : "No tiene categoria"
      }))
      : []

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
          <Table
            setRowSelectionModel={setRowSelectionModel}
            setValores={setValores}
            rowSelectionModel={rowSelectionModel}
            rows={rows}
            columns={columns}
            seleccionar={state.productos}
          />
        </Paper>

        <ModalAll open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} Componente={<FormCrearProducto campos={campos} />} />
        <ModalAll open={openEdit} setOpen={setOpenEdit} setRowSelectionModel={setRowSelectionModel} Componente={<FormEditarProducto valores={valores} />} />

      </div>

      <div className=" ">
        <div className="  w-2/6 ">
          <Outlet className="w-full" />
        </div>
      </div>
    </div>
  );
}
