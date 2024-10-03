import { Link } from "react-router-dom";
import { ServiciosCrear } from "../../services/serviciosCrear";
import { useElegirCategorias } from "../../hooks/useElegirCategorias";


export default function PatientForm() {
    const { state } = useElegirCategorias()
    const { handleOnSubmit, handleChange, producto } = ServiciosCrear()

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="md:w-1/2 lg:w-2/5 mx-5 w-full">
                <h2 className="font-black text-3xl text-slate-800 text-center">Crear nuevo producto</h2>

                <p className="text-lg mt-5 text-center mb-10 text-slate-800 font-semibold">
                    Añade Productos y {''}
                    <span className="text-indigo-600 font-bold">Administralos</span>
                </p>

                <form
                    onSubmit={handleOnSubmit}
                    className="bg-white shadow-md rounded-lg py-4 px-5 mb-10 border border-indigo-800"
                    noValidate

                >
                    <button className='flex items-center mb-6' type="button"  >
                        <Link to="/productos" >
                            <svg className=' size-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </Link>
                    </button>
                    <div className="mb-5">
                        <label htmlFor="producto" className="text-sm uppercase font-bold">
                            Producto
                        </label>
                        <input
                            id="producto"
                            className="w-full p-3 border border-gray-100"
                            type="text"
                            name="producto"
                            value={producto.producto} // Vinculación del estado
                            onChange={handleChange} // Maneja el cambio
                            placeholder="Nombre del producto"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="precio" className="text-sm uppercase font-bold">
                            Precio
                        </label>
                        <input
                            id="precio"
                            className="w-full p-3 border border-gray-100"
                            name="precio"
                            type="number"
                            value={producto.precio} // Vinculación del estado
                            onChange={handleChange} // Maneja el cambio
                            placeholder="Precio del producto"
                            required

                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="categoria" className="text-sm uppercase font-bold">
                            Categoria
                        </label>
                        <select name="categoria" id="categoria" onChange={handleChange}>
                            <option value="">Selecciona una categoría</option>
                            {state.categorias.map(cat => (
                                <option key={cat.id_Categoria} value={cat.categoria}>
                                    {cat.categoria}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="mb-5">
                        <label htmlFor="descripcion" className="text-sm uppercase font-bold">
                            Descripcion
                        </label>
                        <textarea
                            id="descripcion"
                            className="w-full p-3 border border-gray-100"
                            name="descripcion"
                            value={producto.descripcion} // Vinculación del estado
                            onChange={handleChange} // Maneja el cambio
                            placeholder="Descripcion del producto"
                            required

                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="stock" className="text-sm uppercase font-bold">
                            Stock Actual
                        </label>
                        <input
                            id="stock"
                            className="w-full p-3 border border-gray-100"
                            name="stock"
                            value={producto.stock} // Vinculación del estado
                            onChange={handleChange} // Maneja el cambio
                            placeholder="Stock actual de este producto"
                            type="number"
                            required

                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="stock_Min" className="text-sm uppercase font-bold">
                            Stock minimo
                        </label>
                        <input
                            id="stock_Min"
                            type="number"
                            className="w-full p-3 border border-gray-100"
                            name="stock_Min"
                            value={producto.stock_Min} // Vinculación del estado
                            onChange={handleChange} // Maneja el cambio
                            placeholder="Stock minimo de este producto"
                            required

                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    >
                        Guardar Producto
                    </button>
                </form>
            </div>
        </div>
    );
}
