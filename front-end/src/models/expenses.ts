


export interface PaginatedExpenseList {
  data: ExpensesList[],
  currentPage: number,
  perPage: number,
  total: number,
  totalPages: number
}

export interface ExpensesList {
  id: number
  date: string
  category_id: number
  category_name: string
  category_icon: string
  amount: number
  description: string
  user_id: number
  name: string
  email: string
  picture: string
}


export interface ExpensesPost {
  id: number | null,
  date: string,
  category_id: number,
  amount: number,
  oldAmount: number,
  description: string | null,
}
