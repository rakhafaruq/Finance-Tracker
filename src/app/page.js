"use client";
import HeroCard from "@/features/dashboard/components/HeroCard";
import { useFinance } from "@/context/TransactionContext";
import { useMemo } from "react";
import RecentTransaction from "@/features/dashboard/components/RecentTransaction";

export default function Home() {
    const { transaction } = useFinance();

    const { income, outcome, balance } = useMemo(() => {
        if (!transaction || transaction.length === 0) {
            return { income: 0, expense: 0, balance: 0 };
        }


        const inc = transaction.filter((t) => t.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
        const out = transaction.filter((t) => t.type === "outcome").reduce((acc, curr) => acc + curr.amount, 0);
        return { income: inc, outcome: out, balance: inc - out };
    }, [transaction]);

    const formatRupiah = (num) => {
        return new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
            maximumFractionDigits: 0,
        }).format(num);
    };

    const chartData = useMemo(() => {
        const sortedTx = [...transaction].sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedTx.map((tx) => ({
            date: tx.date,
            amount: tx.amount,
            type: tx.type,
        }));
    }, [transaction]);


    return (
        <div>
            {/* hero section */}
            <section className="mb-5">
                <h1 className="font-bold text-3xl mb-2">Dashboard</h1>
                <p className="text-gray-500">Overview of your financial activities</p>
            </section>
            <section className="mb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <HeroCard title="Total Income" amount={formatRupiah(income)} type="income" />
                    <HeroCard title="Total Outcome" amount={formatRupiah(outcome)} type="outcome" />
                    <HeroCard title="Total Balance" amount={formatRupiah(balance)} type="balance" />
                </div>
            </section>

            {/* chart spending */}
            <section>
                <RecentTransaction transaction={transaction} />
            </section>
        </div>
    );
}
