"use client";

import { LayoutDashboard, Receipt, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isActive, isMobileOpen }) {
    const path = usePathname();

    const menuItem = [
        { menu: "Dashboard", icon: LayoutDashboard, href: "/" },
        { menu: "Transaction", icon: Receipt, href: "/transaction" },
        { menu: "Analytics", icon: BarChart3, href: "/analytic" },
    ];

    return (
        <aside
            className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 transition-all ease-in-out duration-300 ${isActive ? "md:w-16" : "md:w-64"} w-64 ${
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
        >
            <div className={`flex h-20 items-center px-6 mt-5 ${isActive ? "justify-center" : "justify-between"} `}>
                <h2 className={`text-blue-700 text-xl font-bold mb-10 transition-opacity ${isActive && "opacity-0"}`}>FinTracker</h2>
            </div>
            <nav>
                {!isActive && <p className="text-gray-600 text-sm mb-3 px-5">Menu</p>}
                {menuItem.map((item) => {
                    const sideOn = path === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex text-sm items-center px-3 py-2 rounded-2xl mx-2 my-1 transition-all duration-200 group relative ${
                                sideOn ? "bg-gray-100 font-bold text-indigo-600" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            } ${isActive ? "justify-center" : "gap-3"}`}
                        >
                            <item.icon size={18} className={`shrink-0 transition-transform duration-300 ${sideOn ? "scale-110" : "group-hover:scale-110"}`} />
                            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 origin-left ${isActive ? "w-0 opacity-0 scale-0" : "w-auto opacity-100 scale-100"}`}>{item.menu}</span>
                            {isActive && <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">{item.menu}</div>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
