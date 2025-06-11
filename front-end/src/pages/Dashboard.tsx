
import { DashboardCards } from "@/features/dashboard/DashboardCards";
import { DashboardGreet } from "@/features/dashboard/DashboardGreet";
import { DashboardMonthsChart } from "@/features/dashboard/DashboardMonthsChart";
import { DashboardTopCategories } from "@/features/dashboard/DashboardTopCategories";
import { useDashboardSummary } from "@/features/dashboard/useDashboardSummary";


export const Dashboard = () => {

    const { dashboardSummary, isPending, error } = useDashboardSummary();

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>{error.message || 'An unknown error occured'}</p>

    if (!dashboardSummary) return <p>No summary</p>

    return (
        <>
            <DashboardGreet />

            <DashboardCards 
                monthExpense={dashboardSummary.monthExpense}
                totalExpense={dashboardSummary.totalExpense}
                averagePerMonth={dashboardSummary.averagePerMonth}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                {/* <div className="border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"> */}
                    <DashboardMonthsChart 
                        monthsExpense={dashboardSummary.monthsExpense || []}
                    />

                    <DashboardTopCategories
                        topCategories={dashboardSummary.topCategories || []} 
                    />
                {/* </div> */}
            </div>


        </>
    )
}