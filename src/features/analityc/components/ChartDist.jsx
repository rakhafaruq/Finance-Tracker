"use client";
import { Pie, PieChart, Label, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { useFinance } from "@/context/TransactionContext";
import { useMemo } from "react";

export default function ChartDist() {
    const { transaction } = useFinance();

    const { incomeData, outcomeData } = useMemo(() => {
        const incomes = {};
        const outcomes = {};

        transaction.forEach((tx) => {
            const amount = Number(tx.amount) || 0;
            const category = tx.category || "Uncategorized";
            const type = tx.type ? tx.type.toLowerCase() : "outcome";

            if (type === "income") {
                incomes[category] = (incomes[category] | 0) + amount;
            } else if (type === "outcome") {
                outcomes[category] = (outcomes[category] | 0) + amount;
            }
        });

        const formatData = (obj) => {
            return Object.keys(obj)
                .map((key) => ({ name: key, value: obj[key] }))
                .sort((a, b) => b.value - a.value);
        };

        return {
            incomeData: formatData(incomes),
            outcomeData: formatData(outcomes),
        };
    }, [transaction]);

    
    const formatRupiah = (num) => {
        return new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
            maximumFractionDigits: 0,
        }).format(num);
    };
    
    function CustomPieChart(data, title, emptyMessage) {
        const chartData = Array.isArray(data) && data.length > 0 && Array.isArray(data[0]) ? data[0] : data;
        console.log(chartData);
        const COLORS = [
            "#4f46e5", // Indigo
            "#10b981", // Emerald
            "#f59e0b", // Amber
            "#ef4444", // Red
            "#8b5cf6", // Violet
            "#ec4899", // Pink
            "#06b6d4", // Cyan
            "#64748b", // Slate
        ];

        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-w-0 h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{chartData.title}</h3>
                <div className="h-[300px] w-full">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="99%" height="100%">
                            <PieChart>
                                <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => formatRupiah(value)} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,1)" }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm italic border-2 border-dashed border-gray-100 rounded-xl">{emptyMessage}</div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <CustomPieChart data={incomeData} title="Incomes Chart" emptyMessage="No Income Data Recorded..." />
            <CustomPieChart data={outcomeData} title="Outcomes Chart" emptyMessage="No outcome Data Recorded..." />
        </div>
    );
}
