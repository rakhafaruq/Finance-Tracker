"use client";

import { LayoutDashboard, Receipt, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const path = usePathname()

    return (
        <div className="w-64 p-5 h-screen">
            <h2 className="text-blue-700 text-xl font-bold mb-10">FinTracker</h2>
            <nav>
                <p className="text-gray-600 text-sm mb-2">Menu</p>
                <ul>
                    <li>
                        <Link href="/" className={`flex text-sm items-center gap-2 block py-2 rounded hover:bg-gray-100 ${path === "/" ? "font-bold text-blue-700 bg-gray-100" : "text-gray-700"}`} >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/transaction" className={`flex text-sm items-center gap-2 block py-2 rounded hover:bg-gray-100 ${path === "/transaction" ? "font-bold text-blue-700 bg-gray-100" : "text-gray-700"}`}>
                            <Receipt size={20} />
                            Transactions
                        </Link>
                    </li>
                    <li>
                        <Link href="/analytic" className={`flex text-sm items-center gap-2 block py-2 rounded hover:bg-gray-100 ${path === "/analityc" ? "font-bold text-blue-700 bg-gray-100" : "text-gray-700"}`}>
                            <BarChart3 size={20} />
                            Analytics
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
