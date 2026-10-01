import { Metadata } from "next";
import { SimpleWidget } from "../../components/index";


export const metadata: Metadata = {
  title: "Pokemons Favoritos API API RESTful",
  description: "Ver listado de pokemones"
};

export default async function DashboardPage(){
        return (
        <div className="text-black p-2">
                <h1 className="mt-2 text-3xl">Dashboard</h1>
                <span className="text-xl">Informacion General Curso con los pokemones</span>
                <div className="flex flex-wrap p-2">
                    <SimpleWidget />
                </div>
        </div>
        )
}