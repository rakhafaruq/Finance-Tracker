"use client";

import { useFinance } from "@/context/TransactionContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

const transactionSchema = z.object({
    title: z.string().min(3, "Input must required"),
    amount: z.coerce.number({ invalid_type_error: "Amount must be a number" }).min(1, "Amount must required"),
    type: z.enum(["income", "outcome"]),
    category: z.string().min(1, "Please select a category"),
    date: z.string().min(1),
});

export default function AddTransaction() {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const { addTransaction } = useFinance();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            title: "",
            amount: "",
            type: "outcome",
            category: "",
            date: new Date().toISOString().split("T")[0],
        },
    });

    const onSubmit = (data) => {
        setIsSubmit(true);
        console.log(data);
        setTimeout(() => {
            addTransaction({
                title: data.title,
                amount: data.amount,
                type: data.type,
                category: data.category,
                date: data.date,
            });
            setIsSubmit(false);
            
            reset();
            router.push("/transaction");
        }, 500);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm block">Title</label>
                    <input
                        type="text"
                        {...register("title")}
                        placeholder="title..."
                        className={`w-full border rounded-lg text-sm p-2 bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600
                        ${errors.title ? "border-red-600 focus:ring-red-200" : "border-gray-200"}
                    `}
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm block">Amount</label>
                    <input
                        type="number"
                        {...register("amount")}
                        placeholder="Rp.0"
                        className={`w-full border rounded-lg text-sm p-2 bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600
                        ${errors.title ? "border-red-600 focus:ring-red-200" : "border-gray-200"}
                    `}
                    />
                    {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm block">Type</label>
                    <div className="flex gap-6 items-center">
                        <label className="text-sm flex gap-2 items-center cursor-pointer group ">
                            <input type="radio" value="income" {...register("type")} className="w-4 h-4 cursor-pointer accent-blue-700" />
                            <span>Income</span>
                        </label>
                        <label className="text-sm flex gap-2 items-center cursor-pointer group">
                            <input type="radio" value="outcome" {...register("type")} className="w-4 h-4 cursor-pointer accent-blue-700" />
                            <span>Outcome</span>
                        </label>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm block">Category</label>
                    {watch("type") === "income" ? (
                        <select
                            {...register("category")}
                            className={`w-full border rounded-lg text-sm p-2 bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600
                        ${errors.title ? "border-red-600 focus:ring-red-200" : "border-gray-200"}
                    `}
                        >
                            <option value="">Select a Categories</option>
                            <option value="salary">Salary</option>
                            <option value="freelance">Freelance</option>
                            <option value="invesment">Invesment</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <select
                            {...register("category")}
                            className={`w-full border rounded-lg text-sm p-2 bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600
                        ${errors.title ? "border-red-600 focus:ring-red-200" : "border-gray-200"}
                    `}
                        >
                            <option value="">Select a Categories</option>
                            <option value="food">Food</option>
                            <option value="housing">Housing</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="transportation">Transportation</option>
                            <option value="tax">Tax</option>
                            <option value="other">Other</option>
                        </select>
                    )}
                    {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm block">Date</label>
                    <input type="date" {...register("date")} className="w-full border border-gray-200 rounded-lg text-sm p-2 bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600" />
                    {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                </div>
                <div className="pt-4 flex justify-between gap-4">
                    <button
                        type="submit"
                        disabled={isSubmit}
                        className="text-white rounded-lg bg-blue-700 hover:bg-blue-500 cursor-pointer p-2 w-full text-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmit ? "Saving..." : "Submit"}
                    </button>
                    <button onClick={() => router.back()} type="submit" disabled={isSubmit} className="text-gray-700 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer p-2 w-full text-sm transition-all border border-gray-200">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
