import SearchProducts from "./SearchProducts";
import { Link, NavLink } from "react-router-dom";
import { useMapeandoCategorias } from "../../hooks/useMapeandoCategorias";
import FormDetalleProducto from "./formDetalleProducto";
import {  ModalProvider } from "../../context/modal";
import { useMapeandoProductos } from "../../hooks/useMapeandoProductos";

export default function ShowProductos() {
    useMapeandoProductos()
    useMapeandoCategorias()
    return (
        <>
            <SearchProducts />
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
