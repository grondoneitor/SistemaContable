import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useMapeandoProductos } from '../../hooks/productos/useMapeandoProductos';
// import { useMapeandoProductosPorNombre } from '../../hooks/productos/useMapeandoProductosPorNombre';
import { useMapeandoCategorias } from '../../hooks/categorias/useMapeandoCategorias';
import { capitalizeFirstLetter } from '../../services/mayusculaPrimeraLetra';
import { useContext } from 'react';
import { ProductoContext } from '../../context/productos';
import Table from '../Table';
import ModalAll from '../Modal';
import FormCrearProducto from './FormCrearPro';
import { campos, columns } from './constantesProductos';
import FormEditarProducto from './FormEditarProducto';
import { ServiciosProducto } from '../../services/Productos/productoServicios';
import { BuscadorDeProductos } from './BuscadorDeProductos';
import Encabezado from '../Encabezado';
import { CategoriaContext } from '../../context/categorias';



export default function FormProductos() {
  useMapeandoProductos()
  // useMapeandoProductosPorNombre()
  useMapeandoCategorias()
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [valores, setValores] = useState({})
  const { state, agregarFiltroCategoria, agregarFiltroNombre } = useContext(ProductoContext)
  const { state: stateCategorias } = useContext(CategoriaContext)
  const { borrarProductoServ, isMoved, isMistake } = ServiciosProducto()
  const rows = state.productos
    ? state.productos.map((producto) => ({
      ...producto,
      producto: capitalizeFirstLetter(producto.producto),
      categoria: producto.categoria ? capitalizeFirstLetter(producto.categoria.categoria) : "No tiene categoria"
    }))
    : []


  const handleChange = (event) => {
    agregarFiltroNombre(event.target.value)
  }

  const filtrarPorCategoria = (event) => {
    agregarFiltroCategoria(event.target.value)

  }

  console.log(state.filters)


  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white w-full rounded-2xl p-6">

        <div>
          <select name="" id="" onChange={filtrarPorCategoria}>
            <option value="">Filtre por categoria</option>
            {
              stateCategorias.categorias.map(categoria =>
              (
                <option key={categoria.id} value={categoria.categoria}>{categoria.categoria}</option>
              )
              )
            }
          </select>
          <Link to="categorias" >ver categorias</Link>
        </div>

        <Paper sx={{ borderRadius: "24px", width: "100%" }}>

          <Encabezado
            setOpen={setOpen}
            setOpenEdit={setOpenEdit}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
            Borrar={borrarProductoServ}
            isMoved={isMoved}
            isMistake={isMistake}
            state={state}
            Componente={<BuscadorDeProductos handleChange={handleChange} />}
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
