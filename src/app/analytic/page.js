import ChartDist from "@/features/analityc/components/ChartDist";
import ChartMonth from "@/features/analityc/components/ChartMonth";
import SpendingBar from "@/features/analityc/components/SpendingBar";


export default function AnalyticPage() {
    return (
        <div>
            <section className="mb-6">
                <h1 className="font-bold text-3xl mb-2">Analytics</h1>
                <p className="text-gray-500 ">Detailed insights into your spending habits</p>
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
    )
}