// import type { DashboardSummary } from "@/models/dashboard"

import { formatNumber } from "@/utils/formatNumber";
import { DashboardCard } from "./DashboardCard";


interface DashboardCardsProps {
    monthExpense: string,
    totalExpense: string,
    averagePerMonth: string
}

export const DashboardCards = ({monthExpense, totalExpense, averagePerMonth}: DashboardCardsProps) => {

    return (
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">

            <DashboardCard
                label="Expenses this month"
                value={formatNumber(+monthExpense)}
            >
                <i className="fi fi-rr-calendar flex text-lg"></i>
            </DashboardCard>
            
            <DashboardCard
                label="Total Expenses"
                value={formatNumber(+totalExpense)}
            >
                <i className="fi fi-rr-calculator-bill flex text-lg"></i>
            </DashboardCard>

            <DashboardCard
                label="Average Expense Monthly"
                value={formatNumber(+averagePerMonth)}
            >
                <i className="fi fi-rr-calculator-bill flex text-lg"></i>
            </DashboardCard>

            

        </div>
    )
}