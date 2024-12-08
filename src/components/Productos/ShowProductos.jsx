import SearchProducts from "./SearchProducts";
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
                <main className="w-full ml-4">
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
