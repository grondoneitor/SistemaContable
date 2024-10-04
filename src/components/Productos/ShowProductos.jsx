import SearchProducts from "./SearchProducts";
import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra";
import { Link, NavLink } from "react-router-dom";
import { useElegirProductos } from "../../hooks/useElegirProductos";
import { ServiciosSearch } from "../../services/serviciosSearch";


export default function ShowProductos() {
     
    const {state, error} = useElegirProductos()
    const { handleSubmit,handleVolver} = ServiciosSearch()
    const productosAmostrar = state.productosBuscados.length > 0 ? state.productosBuscados : state.productos;
    
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
                        {error ? (<p className="text-red-600">{error}</p>) : (
                            productosAmostrar.length <= 0 ? <p className="text-red-600">No hay productos disponibles</p> :
                                (<ul className="grid grid-cols-4 mx-5 gap-8">
                                    {
                                        productosAmostrar.map((item) => (
                                            <li className="text-center w-64 h-52 bg-slate-800" key={item.id}>
                                                <Link to={`${item.id}`} className="flex flex-col items-center justify-center h-full">
                                                    <div className="w-full h-full flex flex-col items-center justify-center border border-indigo-800 p-4 rounded">
                                                        <h2 className="text-lg font-bold text-slate-100">{capitalizeFirstLetter(item.producto)}</h2>
                                                        <h4 className="text-md font-semibold text-slate-50">${item.precio}</h4>
                                                        <h4 className="text-md font-semibold text-slate-50">{capitalizeFirstLetter(item.categoria.categoria)}</h4>
                                                        {item.estado ? (
                                                            <p className="text-green-500">Disponible</p>
                                                        ) : (
                                                            <p className="text-red-500">No disponible</p>
                                                        )}
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>))}
                    </div>
                </main>
            </div>
        </>
    );
}
