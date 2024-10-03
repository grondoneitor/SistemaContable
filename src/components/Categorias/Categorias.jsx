import { Link, NavLink } from "react-router-dom";
import SearchCategorias from "./SearchCategorias";
import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra";
import { ServiciosCrearCategoria } from "../../services/serviciosCrearCategoria";
import { useElegirCategorias } from "../../hooks/useElegirCategorias";


export default function Categorias() {


    const {handleChange,handleSubmitCrear,handleOnClick,handleVolver, activo,categ, handleModificar, handleChangeEdi,handleDelete} = ServiciosCrearCategoria()
    const {state, error} = useElegirCategorias()

    const categoriasMostrar = state.categoriasBuscados.length > 0 ? state.categoriasBuscados : state.categorias

    return (
        <div className="flex flex-col items-center">
            <SearchCategorias />
            <div className="flex w-3/4 mt-16 h-full gap-6 justify-center">
                <aside className="w-2/12 bg-white text-center m-3">
                    <h2 className="mt-2 mb-8 font-black">Opciones</h2>
                    <div className="flex flex-col gap-2">
                        <NavLink to="/productos">-Ver Productos</NavLink>
                        <Link to="/categorias" className="font-semibold">-Ver categorias</Link>
                        <p>Filtros</p>
                    </div>
                </aside>
                <main className="w-full ml-4">
                    <h1 className="font-black text-3xl text-slate-800 text-center mb-14">Categorias</h1>
                    <div >
                        <ul className="grid grid-cols-4 mx-5 gap-8 " >
                            {categoriasMostrar.map((categoria) => (
                                <li key={categoria.id_Categoria} >
                                    <button onClick={() => handleOnClick(categoria)}><h1>{capitalizeFirstLetter(categoria.categoria)}</h1></button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
                {!activo ?
                    <form onSubmit={handleSubmitCrear} className=" bg-white text-center w-2/5">
                        <>
                            <h1 className="font-black p-2 text-xl">Crear categoria</h1>
                            <label htmlFor="categoria"></label>
                            <input onChange={handleChange} className="p-3 m-6 border border-s-4 border-green-600"  type="text" id="categoria" name="categoria" placeholder="categoria" />

                            <button className="bg-indigo-900 p-3 rounded-xl text-slate-100 font-semibold">Crear categoria</button>


                        </>
                    </form>
                    :
                    <form action="">

                        <div className="flex gap-2 items-center p-2 justify-center">
                            <button onClick={handleVolver} className='flex' type="button">
                                <svg className='text-slate-800 size-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                            </button>
                            <h1 className="font-black text-xl">Opciones categoria</h1>
                        </div>


                        <label htmlFor="producto"></label>
                        <input className="p-3 m-6 border border-s-4 border-blue-600" onChange={handleChangeEdi} defaultValue={categ.categoria} type="text" id="producto" name="producto" placeholder="categoria" />

                        <div className="flex gap-2 p-2">
                            <button className="bg-blue-900 p-3 rounded-xl text-slate-100 font-semibold" onClick={handleModificar}>Modificar categoria</button>
                            <button className="bg-red-900 p-3 rounded-xl text-slate-100 font-semibold" onClick={handleDelete}>Eliminar categoria</button>
                        </div>
                    </form>

                }
            </div>

        </div>
    )
}
