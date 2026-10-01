import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestión de Póliza",
  description: "Gestiona los documentos poliza",
};

export default function GestionPolizaPage() {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full" >
                <h1>Gestion de Poliza</h1>
            </div>
        );
}