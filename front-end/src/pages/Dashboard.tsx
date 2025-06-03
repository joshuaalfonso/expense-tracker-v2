import { ChartBarDefault } from "@/features/SampleChart"
import { useAuthContext } from "@/hooks/useAuthContext";


export const Dashboard = () => {
    const { user } = useAuthContext();

    return (
        <>
            { user && (
                <h1 className="mb-4"> 
                    Welcome, 
                    <span className="text-[var(--color-primary)]">
                        {user.user.name} <span className="wave">👋</span>
                    </span>. 
                </h1>
            )}

            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">

                <div 
                    className="flex items-center gap-4 border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"
                >
                    <div className="p-4 rounded-full">
                        <i className="fi fi-rr-calendar flex text-lg"></i>
                    </div>
                    <div className="flex flex-col gap-1 justify-center">
                        <span className="text-sm font-medium opacity-70">Expenses this month</span>
                        <span className="font-semibold text-xl">₱9,129</span>
                    </div>
                </div>

                <div 
                    className="flex items-center gap-4 border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"
                >
                    <div className="p-4  rounded-full">
                        <i className="fi fi-rr-calculator-bill flex text-lg"></i>
                    </div>
                    <div className="flex flex-col gap-1 justify-center">
                        <span className="text-sm font-medium opacity-70">Total Expenses</span>
                        <span className="font-semibold text-xl">₱22,304</span>
                    </div>
                </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
                {/* <div className="border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"> */}
                    <ChartBarDefault />
                {/* </div> */}
            </div>

        </>
    )
}