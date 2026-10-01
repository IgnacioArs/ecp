import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicio Consulta SOAP",
  description: "Se realizan consultas Soap"
};

export default function ServicioConsultaSoapPage() {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full" >
                <h1>Servicio de Consulta Soap</h1>
            </div>
        );
}