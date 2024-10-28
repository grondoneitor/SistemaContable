import SearchProducts from "./SearchProducts";
import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra";
import { Link, NavLink } from "react-router-dom";
import { useElegirProductos } from "../../hooks/useElegirProductos";
import { ServiciosSearch } from "../../services/serviciosSearch";
import { useMapeandoCategorias } from "../../hooks/useMapeandoCategorias";
import { useMapeandoProductos } from "../../hooks/useMapeandoProductos";
import FormDetalleProducto from "./FormDetalleProducto"
import { ProductoContext } from "../../context/productos";
import { useContext } from "react";
import { ModalContext, ModalProvider } from "../../context/modal";

export default function ShowProductos() {

    // const { error} = useElegirProductos()
    const { handleSubmit, handleVolver } = ServiciosSearch()
    const { state } = useContext(ProductoContext)
    const productosAmostrar = state.productosBuscados.length > 0 || state.nombreProductoBuscado !== "" ? state.productosBuscados : state.productos;
    useMapeandoCategorias()

    return (
        <>
            <SearchProducts handleSubmit={handleSubmit} handleVolver={handleVolver} />
            <div className="flex w-full mt-16 h-full gap-6">
                <aside className="w-2/12 bg-white text-center m-3">
                    <h2 className="mt-2 mb-8 font-black">Opciones</h2>
                    <div className="flex flex-col gap-2">
                        <NavLink to="crear-producto" className="font-semibold">-Crear Producto</NavLink>
                        <Link to="/categorias" >-Ver categorias</Link>
                        <p>Filtros</p>
                    </div>
                </aside>
                <main className="w-full ml-4">
                    <h1 className="font-black text-3xl text-slate-800 text-center mb-14">Productos</h1>
                    <div>
                        <ModalProvider>
                            <FormDetalleProducto />
                        </ModalProvider>
                    </div>
                </main>
            </div>
        </>
    );
}
