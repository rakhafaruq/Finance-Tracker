"use client"

import EditTransaction from "@/features/transaction/components/EditTransaction";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <section className="flex items-center w-full text-left gap-4 mb-6">
                <div className="cursor-pointer rounded-lg hover:bg-green-500 hover:text-white p-2">
                    <Link href="/transaction">
                        <ArrowLeft size={18} />
                    </Link>
                </div>
                <div>
                    <h1 className="font-bold text-3xl">Edit Transaction</h1>
                    <p className="text-gray-500 ">Update Transaction Details</p>
                </div>
            </section>
            <section className="bg-white p-6 border border-gray-100 shadow-sm rounded-xl">
                <EditTransaction />
            </section>
        </div>
    );
}
