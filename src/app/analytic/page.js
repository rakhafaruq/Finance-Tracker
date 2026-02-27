import ChartDist from "@/features/analityc/components/ChartDist";
import ChartMonth from "@/features/analityc/components/ChartMonth";
import SpendingBar from "@/features/analityc/components/SpendingBar";

export default function AnalyticPage() {
    return (
        <div>
            <section className="mb-6 flex flex-col md:flex-row justify-between">
                <div>
                    <h1 className="font-bold text-3xl mb-2">Analytics</h1>
                    <p className="text-gray-500 ">Detailed insights into your spending habits</p>
                </div>
                <div className="flex items-center gap-2 px-3 rounded-xl bg-white border border-gray-200 ">
                    <input type="month" />
                </div>
            </section>
            <section className="mb-6">
                <SpendingBar />
            </section>
            <section className="mb-6">
                <ChartMonth />
            </section>
            <section>
                <ChartDist />
            </section>
        </div>
    );
}
