"use client";

import { useMemo } from "react";
import { useFinance } from "@/context/TransactionContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export default function ChartMonth() {
    const { transaction } = useFinance();

    const chartData = useMemo(() => {
        // Urutkan berdasarkan tanggal
        const groupChart = transaction.reduce((acc, curr) => {
            const dateKey = curr.date;
            const amount = Number(curr.amount);
            const isExpense = curr.type === "outcome";
            if (!acc[dateKey]) {
                // Jika BELUM, kita inisialisasi dulu wadahnya
                acc[dateKey] = {
                    date: dateKey,
                    income: 0,
                    outcome: 0, // Pastikan ada properti awal 0
                };
            }

            if (isExpense) {
                acc[dateKey].outcome += amount;
            } else {
                acc[dateKey].income += amount;
            }
            return acc;
        }, {});

        return Object.values(groupChart).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [transaction]);

    const formatRupiah = (num) => {
        return new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
            maximumFractionDigits: 0,
        }).format(num);
    };
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-w-0">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Trend</h2>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="99%" height="100%" debounce={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9ca3af" }} tickLine={false} axisLine={false} dy={10} />
                        <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                        <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} formatter={(value) => formatRupiah(value)} />
                        <Legend verticalAlign="top" height={36} />

                        {/* LINE 1: INCOME (Hijau/Emerald) */}
                        {/* <Line
                            name="Income"
                            type="monotone"
                            dataKey="income"
                            stroke="#10b981" // Emerald 500
                            strokeWidth={3}
                            dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 6 }}
                        /> */}

                        {/* LINE 2: EXPENSE (Merah/Rose) */}
                        <Line
                            name="outcome"
                            type="monotone"
                            dataKey="outcome"
                            stroke="#f43f5e" // Rose 500
                            strokeWidth={3}
                            dot={{ r: 4, fill: "#f43f5e", strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
