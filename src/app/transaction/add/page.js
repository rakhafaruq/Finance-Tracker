"use client"

import AddTransaction from "@/features/transaction/components/AddTransaction";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <section className="flex items-center w-full text-left gap-4 mb-6">
                <div className="cursor-pointer rounded-lg hover:bg-green-500 hover:text-white p-2">
                    <Link href="/transaction">
                        <ArrowLeft size={18} />
                    </Link>
                </div>
                <div>
                    <h1 className="font-bold text-3xl">Add Transaction</h1>
                    <p className="text-gray-500 ">Record a new income or outcome</p>
                </div>
            </section>
            <section className="bg-white p-6 border border-gray-100 shadow-sm rounded-xl">
                <AddTransaction />
            </section>
        </div>
    );
}
