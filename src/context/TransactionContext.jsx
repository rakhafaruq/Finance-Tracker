"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { supabase } from "@/lib/SupabaseClient";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transaction, setTransaction] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // READ DATA
    useEffect(() => {
        const fetchTrans = async () => {
            setIsLoading(true);
            if (!supabase) {
                console.error("Supabase client belum terinisialisasi! Cek .env.local");
                setIsLoading(false);
                return;
            }
            const { data, error } = await supabase.from("transactions").select("*").order("date", { ascending: false });
            if (error) {
                console.error(error);
            } else {
                setTransaction(data || []);
            }
            setIsLoading(false);
            console.log(data);
        };
        fetchTrans();
    }, []);

    // CREATE DATA
    const addTransaction = async (newTx) => {
        const { ...transactionData } = newTx;

        const { data, error } = await supabase.from("transactions").insert([transactionData]).select();
        if (error) {
            console.error("Error adding transaction:" + error);
            alert("Gagal Menyimpan Data");
        } else {
            if (data) setTransaction((prev) => [data[0], ...prev]);
        }
    };

    const editTransaction = async (id, updateTx) => {
        const { error } = await supabase.from("transactions").update(updateTx).eq("id", id);
        if (error) {
            console.error("Error update transaction: " + error);
        } else {
            setTransaction((prev) => prev.map((tx) => (tx.id === id ? { ...tx, ...updateTx } : tx)));
        }
    };

    const deleteTransaction = async (id) => {
        const { error } = await supabase.from("transactions").delete().eq("id", id);
        if (error) {
            console.error("Error Delete Transaction: " + error);
        } else {
            setTransaction((prev) => prev.filter((tx) => tx.id !== id));
        }
    };

    return <FinanceContext.Provider value={{ transaction, isLoading, addTransaction, editTransaction, deleteTransaction }}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => useContext(FinanceContext);
