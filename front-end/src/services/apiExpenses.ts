import type { ExpensesList, ExpensesPost } from '@/models/expenses';
import axios from './axiosInstance';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const tableName = 'expenses'

export const fetchExpenses = async () => {

    const { data } = await axios.get(`${baseUrl}${tableName}`);
    return data as ExpensesList[];

}

export const createExpense = async (expense: ExpensesPost) => {

    const { data } = await axios.post(`${baseUrl}${tableName}`, expense);
    return data;

}