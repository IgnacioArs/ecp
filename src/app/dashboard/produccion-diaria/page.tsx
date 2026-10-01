import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Producción Diaria",
  description: "Ver reportes diarios"
};

export default function ProduccionDiariaPage() {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full" >
                <h1>Produccion de Diaria</h1>
            </div>
        );
}