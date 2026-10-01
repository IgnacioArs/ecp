import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio del proyecto",
  description: "Conjunto del sistema correspondiente"
};

export default function HomePage() {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full" >
                <h1>Home de Page</h1>
            </div>
        );
}