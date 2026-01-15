"use client";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFinance } from "@/context/TransactionContext";
import SearchBar from "./SearchBar";

export default function TransactionCard() {
    const { transaction, deleteTransaction } = useFinance();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    const filteredData = transaction
        .filter((tx) => {
            const matchSearch = tx.type.toLowerCase().includes(searchTerm.toLowerCase()) || tx.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === "all" ? true : tx.type === filterType;
            return matchesType && matchSearch;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleDelete = (id) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus transaksi ini?")) {
            deleteTransaction(id);
        }
    };

    const handleEdit = (transaction) => {
        router.push(`/transaction/edit/${transaction}`);
    };

    const formatRupiah = (num) => {
        return new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
            maximumFractionDigits: 0,
        }).format(num);
    };


    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <SearchBar transaction={transaction} setSearchTerm={setSearchTerm} setFilterType={setFilterType} searchTerm={searchTerm} filterType={filterType} />
            <div>
                {transaction.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead>
                                <tr className="text-gray-500 text-sm border-b border-gray-200 tracking-wider">
                                    <th className="p-4 ">Title</th>
                                    <th className="p-4 ">Category</th>
                                    <th className="p-4 ">Amount</th>
                                    <th className="p-4 ">Type</th>
                                    <th className="p-4 ">Date</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((tx) => (
                                    <tr key={tx.id}>
                                        <td className="p-4 text-sm font-bold whitespace-nowrap">{tx.title}</td>
                                        <td className="p-4 text-sm">{tx.category}</td>
                                        <td className={`p-4 text-sm ${tx.type === "income" ? "text-green-500" : "text-gray-800"}`}>
                                            {tx.type === "income" ? "+" : "-"} {formatRupiah(tx.amount)}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs rounded-xl  ${tx.type === "income" ? "text-green-500 bg-green-100" : "text-gray-800 bg-gray-100"}`}>{tx.type}</span>
                                        </td>
                                        <td className="p-4 text-sm">{tx.date}</td>
                                        <td className="p-4 text-sm gap-2 text-center">
                                            <button className="rounded-md p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleEdit(tx.id)}>
                                                <Pencil size={18} />
                                            </button>
                                            <button className="rounded-md p-3 cursor-pointer text-red-500 hover:bg-red-100 transition-colors" title="delete" onClick={() => handleDelete(tx.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h1>No Transaction yet.</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
