import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// eslint-disable-next-line react/prop-types
export default function Home({ array }) {
  const lista = array
  return (
    <body className="w-full">
      <h1 className="text-center my-9 text-5xl text-slate-800 font-semibold">Llevemos el control de tu pagina</h1>
      <h2 className="text-center text-3xl text-slate-700 font-bold ">Nombre empresa</h2>


      <main className="flex w-full   h-screen ">
        <nav className=" ml-2 pl-4  rounded-md bg-white w-72 h-full border-r-2 border-b-2 border-slate-800 ">
          <div className="flex justify-center items-center h-16">
            <div className="w-2/3 bg-black h-1"></div>
          </div>
          <ul className="grid  gap-3 justify-around mb-6">
            {
              lista.map((item) => {
                return (
                  <li key={item.url} className="  shadow-2xl    border-2 border-slate-50 items-center gap-2  ">
                    <Link to={item.url} className=" flex items-center gap-2 text-slate-50 ">
                      <FontAwesomeIcon icon={item.icono} className="text-2xl text-slate-800" />
                      <p className="text-xl text-slate-800">{item.nombre}</p>
                    </Link>
                  </li>
                )

              })
            }
          </ul>
        </nav>
        <section className="mt-4 w-full flex flex-col items-center">
          <Outlet />
        </section>

      </main>

    </body>
  );
}
