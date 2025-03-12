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
import { SuccessOrError } from '../Messages/SuccessOrError';
import FiltroDeslizante from '../Filtros';
import Opciones from '../Opciones';
import { BuscadorDeProductos } from './BuscadorDeProductos';
import { CategoriaContext } from '../../context/categorias';

export default function FormProductos() {
  useMapeandoProductos()
  useMapeandoCategorias()
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [openfilter, setOpenFilter] = useState(false)

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [valores, setValores] = useState({})
  const { state, agregarFiltroNombre, agregarFiltroCategoria } = useContext(ProductoContext)
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




  const { state: stateCategorias } = useContext(CategoriaContext)
  const filtrarPorCategoria = (event) => {
    agregarFiltroCategoria(event.target.value)

  }



  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white w-full rounded-2xl p-6">
        <div className='flex justify-between w-full'>

          <Opciones
            setOpen={setOpen}
            setOpenEdit={setOpenEdit}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
            Borrar={borrarProductoServ}
            setOpenFilter={setOpenFilter}
            Componente={<BuscadorDeProductos handleChange={handleChange} />}
            categoria={<Link to="categorias" className='border border-fuchsia-950 p-2 bg-gradient-to-br bg-[#d1c1f3] text-black m-2'> Ver categorias </Link>}
            nombre="producto"
          />

          <FiltroDeslizante
            open={openfilter}
            setOpen={setOpenFilter}
            Filtro={
              <div className="w-full">
                <select className="bg-fuchsia-950 text-white p-3 w-full" name="" id="" onChange={filtrarPorCategoria}>
                  <option value="">Filtre por categoria</option>
                  {
                    stateCategorias.categorias.map(categoria =>
                    (
                      <option key={categoria.id} value={categoria.categoria}>{categoria.categoria}</option>
                    )
                    )
                  }
                </select>
              </div>} />

        </div>
        <Paper sx={{ width: "100%" }}>
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

        {
          state.mensajeError ?
            <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
            :
            <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />
        }
      </div>
      <div className=" ">
        <div className="  w-2/6 ">
          <Outlet className="w-full" />
        </div>
      </div>
    </div>
  );
}
