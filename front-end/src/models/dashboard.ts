



export interface DashboardSummary {
  totalExpense: string
  monthExpense: string
  averagePerMonth: string
  topCategories: TopCategories[]
  monthsExpense: MonthsExpense[]
}

export interface TopCategories {
  category_id: number
  category_name: string
  count: number
}

export interface MonthsExpense {
  month_number: number
  month_name: string
  total: string
}
