"use client";

import { useState, createContext, useContext, useEffect, useRef } from "react";

const FinanceContext = createContext();
const dataTransaction = [
    { id: 1, title: "Salary", category: "income", type: "income", amount: 500000, date: "2025-01-15" },
    { id: 2, title: "Shopping", category: "Housing", type: "outcome", amount: 20000, date: "2025-01-15" },
];

export const FinanceProvider = ({ children }) => {
    const [transaction, setTransaction] = useState(dataTransaction);
    const isMounted = useRef(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTrans = localStorage.getItem("finance-tracker-data");
            if (savedTrans) {
                try {
                    setTransaction(JSON.parse(savedTrans));
                } catch (err) {
                    console.log(err);
                    
                }
            }
            isMounted.current = true
        }
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            
            localStorage.setItem("finance-tracker-data", JSON.stringify(transaction));
        }
    }, [transaction]);

    const addTransaction = (newTx) => {
        setTransaction((prev) => [...prev, { ...newTx, id: Date.now() }]);
    };

    const editTransaction = (id, updateTx) => {
        setTransaction((prev) => prev.map((tx) => (tx.id === id ? { ...tx, ...updateTx } : tx)));
    };

    const deleteTransaction = (id) => {
        setTransaction((prev) => prev.filter((tx) => tx.id !== id));
    };

    return <FinanceContext.Provider value={{ transaction, addTransaction, editTransaction, deleteTransaction }}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => useContext(FinanceContext);
