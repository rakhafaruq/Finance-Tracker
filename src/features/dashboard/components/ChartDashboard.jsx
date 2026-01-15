"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";

export default function ChartDashboard({ chartData }) {

    const [isMounted, setIsMounted] = useState(false);

    // 2. Data Dummy (Safety net jika chartData kosong)
    const dataToRender = chartData && chartData.length > 0 ? chartData : [{ amount: 0, date: "No Data", type: "none" }];

    // 3. Effect ini hanya jalan di browser
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 4. PENTING: Jangan render Chart kalau belum mounted
    // Ini mencegah error "width(-1)" saat Next.js rendering di server
    if (!isMounted) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[300px] flex items-center justify-center">
                <p className="text-gray-400 text-sm">Loading Chart...</p>
            </div>
            
        );
    }

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart dataKey={dataToRender} width={500} height={500}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <Line dataKey="amount" type="monotone" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
