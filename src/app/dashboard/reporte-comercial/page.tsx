import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reporte Comercial",
  description: "Genera reporte de comercio"
};

export default function ReporteComercialPage() {
        return (
           <div className="flex flex-col items-center justify-center w-full h-full" >
                <h1>Reporte de Comercial</h1>
            </div>
        );
}