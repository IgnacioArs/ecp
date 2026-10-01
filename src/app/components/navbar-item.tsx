'use client'

import { JSX } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
    path:string;
    icono:JSX.Element;
    titulo:string;
    subTitulo?:string;
}
export const NavbarItem = ({path,icono,titulo,subTitulo}:Props) => {

 const usePatchName = usePathname();
 
  return (
    <Link href={path}>
        <li className={`${path===usePatchName? "text-blue-600":"text-blue-100"} flex items-center px-4 py-3 hover:bg-gray-700 cursor-pointer`}>
            {icono}
            <span>{titulo}</span>
        </li>
    </Link>
  )
}

