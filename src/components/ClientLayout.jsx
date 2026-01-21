"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, PanelLeft } from "lucide-react";

export default function ClientLayout({ children }) {
    const [isActive, setIsActive] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isActive={isActive} isMobileOpen={isMobileOpen} />

            {isMobileOpen && <div onClick={() => setIsMobileOpen(false)} className="fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity" />}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isActive ? "md:ml-16" : "md:ml-64"}`}>
                <header className="h-16 border-b border-b-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-50 w-full">
                    <button onClick={() => setIsActive(!isActive)} className="hidden md:block p-2 -ml-2 mr-4 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer">
                        <PanelLeft size={18} />
                    </button>
                    <button onClick={() => setIsMobileOpen(true)} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                        {" "}
                        <Menu size={22} />{" "}
                    </button>
                </header>
                <main className={`flex-1 p-6 md:p-8`}>{children}</main>
            </div>
        </div>
    );
}
