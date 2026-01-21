import { FinanceProvider } from "@/context/TransactionContext";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <FinanceProvider>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </FinanceProvider>
            </body>
        </html>
    );
}
