"use client";

import { useState, useMemo } from "react";
import { useFinance } from "@/context/TransactionContext";

export default function AnalitycDashboard() {
    const {transaction} = useFinance();

    const [selectMonth, setSelectMonth] = useState(new Date().toISOString().slice(0, 7))

    const filteredData = useMemo(() => {
        if(!transaction) return [];
        return transaction.filter((tx) => {
            return tx.date && tx.date.startsWith(selectMonth);
        })
    }, [transaction, selectMonth]);
    return (
        <>
            <section className="mb-6 flex flex-col md:flex-row justify-between">
                <div>
                    <h1 className="font-bold text-3xl mb-2">Analytics</h1>
                    <p className="text-gray-500 ">Detailed insights into your spending habits</p>
                </div>
                <div className="flex items-center gap-2 px-3 rounded-xl bg-white border border-gray-200 ">
                    <input type="month" value={selectMonth} onChange={(e) => setSelectMonth(e.target.value)} />
                </div>
            </section>
        </>
    )
}