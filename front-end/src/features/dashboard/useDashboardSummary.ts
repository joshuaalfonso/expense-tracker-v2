import { fetchDashboardSummary } from "@/services/apiDashboard"
import { useQuery } from "@tanstack/react-query"


export const useDashboardSummary = () => {

     const {data: dashboardSummary, isPending, error} = useQuery({
        queryFn: fetchDashboardSummary,
        queryKey: ['dashboard_summary']
    })

    return { dashboardSummary, isPending, error }

}