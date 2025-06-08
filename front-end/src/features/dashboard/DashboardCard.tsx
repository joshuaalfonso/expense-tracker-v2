

interface DashboardCardProps {
  label: string;
  value: number | string;
  children: React.ReactNode;
};


export const DashboardCard = ({label, value, children}: DashboardCardProps) => {

    return (
        <div 
            className="flex items-center gap-4 border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"
        >
            <div className="p-4 rounded-full">
                {children}
            </div>
            <div className="flex flex-col gap-1 justify-center">
                <span className="text-sm font-medium opacity-70">{label}</span>
                <span className="font-semibold text-xl">₱{value}</span>
            </div>
        </div>
    )

}