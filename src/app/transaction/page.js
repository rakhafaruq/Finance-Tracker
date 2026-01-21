"use client"
import TransactionCard from "@/features/transaction/components/TransactionCard";
import Link from "next/link";

export default function TransactionPage() {

    return (
        <div>
            {/* hero section */}
            <section className="mb-5 flex justify-between items-center">
                <div>
                    <h1 className="font-bold text-3xl mb-2">Transaction</h1>
                    <p className="text-gray-500 ">Manage your income and expenses</p>
                </div>
                <Link href="/transaction/add" className="rounded-md bg-blue-600 text-white text-sm px-4 py-2 w-36 justify-center gap-2 whitespace-nowrap cursor-pointer">+ Add Transaction</Link>
            </section>
            {/* main section */}
            <section>
                <TransactionCard/>
            </section>

        </div>
    );
}
