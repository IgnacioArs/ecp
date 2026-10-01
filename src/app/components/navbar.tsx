import Image from "next/image"
import { NavbarItem } from './navbar-item';
import {
  HiHome,
  HiDocumentText,
  HiClipboardDocumentList,
  HiChartBar,
  HiPresentationChartLine,
  HiCircleStack,
  HiArrowsRightLeft,
  HiStar,
  HiSquares2X2
} from "react-icons/hi2";

//aqui creamos los items correspondientes del menu
const menuItems = [
    {       
            id_items:1,
            path:'/dashboard/home',
            icono:<HiHome className="h-5 w-5 mr-4"/>,
            titulo:'Home',
            subTitulo:'',
    },
    {
            id_items:2,
            path:'/dashboard/emision-poliza',
            icono:<HiDocumentText className="h-5 w-5 mr-4"/>,
            titulo:'Emisión de Póliza',
            subTitulo:'',
    },
    {
            id_items:3,
            path:'/dashboard/gestion-poliza',
            icono:<HiClipboardDocumentList className="h-5 w-5 mr-4"/>,
            titulo:'Gestión de Póliza',
            subTitulo:'',
    },
    {
            id_items:4,
            path:'/dashboard/produccion-diaria',
            icono:<HiChartBar className="h-5 w-5 mr-4"/>,
            titulo:'Producción Diaria',
            subTitulo:'',
    },
    {
            id_items:5,
            path:'/dashboard/reporte-comercial',
            icono:<HiPresentationChartLine className="h-5 w-5 mr-4"/>,
            titulo:'Reporte Comercial',
            subTitulo:'',
    },
    {
            id_items:6,
            path:'/dashboard/integraciones-monitoreo',
            icono:<HiCircleStack className="h-5 w-5 mr-4"/>,
            titulo:'Integraciones & Monitoreo',
            subTitulo:'',
    },
    {
            id_items:7,
            path:'/dashboard/servicio-consulta-soap',
            icono:<HiArrowsRightLeft className="h-5 w-5 mr-4"/>,
            titulo:'Servicio Consulta SOAP',
            subTitulo:'',
    },
    {
            id_items:8,
            path:'/dashboard/pokemons',
            icono:<HiArrowsRightLeft className="h-5 w-5 mr-4"/>,
            titulo:'Pokemons',
            subTitulo:'',
    },
    {
            id_items:9,
            path:'/dashboard/favorito',
            icono:<HiStar className="h-5 w-5 mr-4"/>,
            titulo:'Favorito pokemon',
            subTitulo:'',
    },
    {
            id_items:10,
            path:'/dashboard/dashboard',
            icono:<HiSquares2X2 className="h-5 w-5 mr-4"/>,
            titulo:'Dashboard',
            subTitulo:'',
    }
]

export const Navbar = () => {
  return (
    <nav className="w-50 flex-shrink-0">
                    <div className="flex-auto bg-gray-900 h-full">
                        <div className="flex flex-col overflow-y-auto">
                            <ul className="relative m-0 p-0 list-none h-full">

                            {/* TÍTULO */}
                            <li className="relative text-white text-2xl p-4 w-full flex justify-start shadow-sm border-b border-gray-700 overflow-hidden">
                                    {/* Imagen de fondo */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-30"
                                        style={{
                                        backgroundImage: "url('https://wallpapers.com/images/high/data-management-1600-x-1200-wallpaper-r0mpktkisisx4w1f.webp')"
                                        }}
                                    />
                                    {/* Contenido */}
                                    <span className="relative z-10 font-semibold">
                                        ECP Soapex
                                    </span>
                            </li>


                                {/* SUBTÍTULO */}
                                <li className="text-white p-4 w-full flex relative shadow-sm justify-start bg-gray-800 border-b border-gray-700">
                                    <div className="mr-4 flex-shrink-0 my-auto">
                                        <button className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
                                            <Image   
                                              className="h-full w-full object-cover" 
                                              src="https://www.w3schools.com/howto/img_avatar.png" 
                                              alt="Usuario Avatar"
                                              width={50}
                                              height={50}
                                              priority={true}
                                              ></Image>
                                        </button>
                                    </div>
                                <div className="flex-auto my-1">
                                    <span>Emisión y control de pólizas</span>
                                </div>
                                </li>

                                {/* MENÚ */}
                                <li className="p-4 w-full flex relative shadow-sm">
                                <div className="flex-auto my-1">
                                    <span className="text-white font-medium">Menú</span>
                                </div>
                                </li>

                                {menuItems.map((arrayItemsMenu)=> (
                                    <NavbarItem key={arrayItemsMenu.id_items} path={arrayItemsMenu.path} icono={arrayItemsMenu.icono} titulo={arrayItemsMenu.titulo} />
                                ))}
                                
                        
                            </ul>
                        </div>
                    </div>
                </nav>
  )
}

