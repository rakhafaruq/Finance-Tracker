"use client";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function HeroCard({ title, amount, type, trend }) {
    const isIncome = type === "income";
    const isOutcome = type === "outcome";

    const Icon = isIncome ? TrendingUp : isOutcome ? TrendingDown : Wallet;
    const IconColor = isIncome || type === "balance" ? "text-green-500" : "text-red-500";

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="items-start">
                <div className="flex justify-between content-center">
                    <p className="font-bold text-gray-500 text-sm mb-4">{title}</p>
                    <div className={`mr-2 rounded-lg ${IconColor}`}>
                        <Icon size={20} />
                    </div>
                </div>
                <h3 className="font-bold text-2xl">{amount}</h3>
            </div>
        </div>
    );
}
