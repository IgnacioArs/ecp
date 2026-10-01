import { Navbar } from "../components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
                
                {/*AQUI VA EL NAV*/}
                <Navbar/>
                {/*Desde aqui ya dejamos los children correspondientes*/}
                <div className="p-2 w-full text-slate-900">
                    {children}
                </div>
    </div>
  );
}