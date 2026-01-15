"use client";

import { useMemo } from "react";
import { useFinance } from "@/context/TransactionContext";

export default function SpendingBar() {
    const { transaction } = useFinance();

    const categoryStats = useMemo(() => {
        const expense = transaction.filter((t) => t.type === "outcome");
        const totalExp = expense.reduce((acc, curr) => acc + Number(curr.amount), 0);

        const groupStats = expense.reduce((acc, curr) => {
            const cat = curr.category || "Uncategorized";
            if (!acc[cat]) {
                acc[cat] = 0;
            }
            acc[cat] += Number(curr.amount);
            return acc;
        }, {});

        const result = Object.keys(groupStats)
            .map((key) => {
                const amount = groupStats[key];
                const percentage = totalExp > 0 ? (amount / totalExp) * 100 : 0;
                return {
                    name: key,
                    amount: amount,
                    percentage: percentage.toFixed(1),
                };
            })
            .sort((a, b) => b.amount - a.amount);

        return { data: result, total: totalExp };
    }, [transaction]);

    const formatRupiah = (num) => {
        return new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
            maximumFractionDigits: 0,
        }).format(num);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Spending by Category</h2>
            {categoryStats.data.length > 0 ? (
                <div className="space-y-6">
                    {categoryStats.data.map((cat) => (
                        <div key={cat.name}>
                            <div className="flex justify-between items-center mb-2 text-sm">
                                <span>{cat.name}</span>
                                <div className="text-gray-400">
                                    <span> {formatRupiah(cat.amount)} </span>
                                    <span> ({cat.percentage}%) </span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-indigo-600 h-3 rounded full transition-all duration-500 ease-out" style={{ width: `${cat.percentage}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-2xl font-semibold">No Transaction yet...</div>
            )}
        </div>
    );
}
