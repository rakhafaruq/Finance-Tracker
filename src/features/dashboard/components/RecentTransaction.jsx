import Link from "next/link";

export default function RecentTransaction({ transaction }) {
    const formatRupiah = (num) => {
        return new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency",
            maximumFractionDigits: 0,
        }).format(num);
    };
    return (
        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex justify-between mb-4">
                <h3 className="text-xl font-bold ">Recent Transactions</h3>
                <Link href="/transaction" className="text-sm text-gray-700 hover:bg-green-400 rounded-sm p-2 hover:text-white font-bold">View all &rarr;</Link>
            </div>
            <div className="flex flex-col gap-4">
                {transaction.length > 0 ? (
                    transaction.slice(0, 5).map((tx) => (
                        <div key={tx.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                            <div>
                                <h3>{tx.title}</h3>
                                <p className="text-sm text-gray-500">{tx.category || "General"}</p>
                            </div>
                            <div>
                                <p className={`font-bold text-sm ${tx.type === 'income' ? 'text-green-500' : 'text-gray-800'}`}>
                                    {tx.type === "income" ? "+" : "-"} {formatRupiah(tx.amount)}
                                </p>
                                <p className="text-sm text-gray-500 text-right">{tx.date}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>No Transaction yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
