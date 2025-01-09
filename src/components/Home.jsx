import { Link, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Home({ array }) {
  const algo = array
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
              algo.map((item) => {
                return (
                  <li key={item.url} className="  shadow-2xl    border-2 border-slate-50 items-center gap-2  ">
                  <Link to={item.url} className=" flex items-center gap-2 text-slate-50 ">

                    <svg
                      className="w-6   text-slate-800"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
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
