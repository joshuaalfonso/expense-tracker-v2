import type { ExpensesList, ExpensesPost, PaginatedExpenseList } from '@/models/expenses';
import axios from './axiosInstance';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const tableName = 'expenses'

export const fetchExpenses = async () => {
    const { data } = await axios.get(`${baseUrl}${tableName}`);
    return data as ExpensesList[];
}

export const fetchPaginatedExpenses = async (page: number) => {
    const { data } = await axios.get(`${baseUrl}${tableName}/${'page/' + page}`);
    return data as PaginatedExpenseList;
}

export const createExpense = async (expense: ExpensesPost) => {
    const { data } = await axios.post(`${baseUrl}${tableName}`, expense);
    return data;
}

export const editExpense = async (expense: ExpensesPost) => {
    const { data } = await axios.put(`${baseUrl}${tableName}${'/' + expense.id}`, expense);
    return data;
}

export const deleteExpense = async (expensePost: ExpensesList) => {
    const { data } = await axios.delete(`${baseUrl}${tableName}${'/' + expensePost.id}${'/' + expensePost.amount}`);
    return data;
}