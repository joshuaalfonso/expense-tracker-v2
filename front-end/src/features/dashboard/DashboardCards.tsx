// import type { DashboardSummary } from "@/models/dashboard"

import { formatNumber } from "@/utils/formatNumber";
import { DashboardCard } from "./DashboardCard";


interface DashboardCardsProps {
    monthExpense: string,
    totalExpense: string
}

export const DashboardCards = ({monthExpense, totalExpense}: DashboardCardsProps) => {

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

            <div 
                className="flex items-center gap-4 border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"
            >
                <div className="p-4  rounded-full">
                    <i className="fi fi-rr-calendar flex text-lg"></i>
                </div>
                <div className="flex flex-col gap-1 justify-center">
                    <span className="text-sm font-medium opacity-70">Expenses this month</span>
                    <span className="font-semibold text-xl">₱9,129</span>
                </div>
            </div>

        </div>
    )
}