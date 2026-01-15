"use client";

import { FinanceProvider } from "@/context/TransactionContext";
import { PanelLeft } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { useState } from "react";

export default function RootLayout({ children }) {
    const [isActive, setIsActive] = useState(false);

    const handleSidebar = () => {
        setIsActive(!isActive);
        console.log(isActive);
    };

    return (
        <html lang="en">
            <body className="min-h-screen w-full flex">
                <FinanceProvider>
                    {isActive ? ("") : (<Sidebar />)}
                    
                    <div className="flex-1 flex flex-col">
                        <header className="h-16 border-b border-b-gray-200 bg-white bg-card flex items-center justify-between px-6 sticky top-0 z-10">
                            <PanelLeft onClick={() => handleSidebar()} size={20} className="cursor-pointer" />
                        </header>
                        <main className="flex-1 p-10 bg-gray-50"> {children} </main>
                    </div>
                </FinanceProvider>
            </body>
        </html>
    );
}
