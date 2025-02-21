
import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet} from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function Home({ array }) {
  const campos = array
  const [active, setActive] = useState(campos[0].nombre);

  // const [token, setToken] = useState(localStorage.getItem("tokenLogin"))
  // useEffect(() => {
  //   const changeToken = () => {
  //     setToken(localStorage.getItem("tokenLogin"))

  //   }

  //   window.addEventListener("storage", changeToken)
  //   console.log("Cambiando", token)

  //   return () => window.removeEventListener("storage", changeToken)

  // }, [])
  // useEffect(() => {
  //   !token && navigate("/")
  // }, [token, navigate])


  return (
   <div className="flex h-screen bg-gradient-to-br bg-[#d1c1f3] ">
    {/* Sidebar */}
    <aside className="relative w-64 pl-4   flex flex-col bg-gradient-to-br bg-[#fdfdfd] ">
      <div className="text-2xl font-bold my-6 text-center">Menu</div>
      <nav className="space-y-2 flex-1 justify-end">
        {campos.map(({ url, nombre, icono: Icon }) => (

          <Link
            to={url}
            key={nombre}
            className={`flex ml-auto items-center gap-3 w-full mr-0 p-5 rounded-s-lg transition ${active === nombre ? " bg-gradient-to-br bg-[#d1c1f3] text-black " : "text-gray-600  hover:bg-[#ab9fc9] hover:text-white"
              }`}
            onClick={() => setActive(nombre)}
          >

            {Icon && <FontAwesomeIcon icon={Icon} className="text-2xl text-slate-800" />} {nombre}
          </Link>

        ))}
      </nav>
      <button className="mt-auto p-3 text-gray-600 hover:text-red-500">Log out</button>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-6 ">
      <h1 className="text-fuchsia-950 text-4xl font-bold">{active}</h1>
      <div className="bg-white rounded-2xl p-6">
        <section className="mt-4 w-full flex flex-col items-center ">
          <Outlet />
        </section>
      </div>
    </main>
  </div> 
  );
}
