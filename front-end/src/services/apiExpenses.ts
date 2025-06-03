import type { ExpensesList } from '@/models/expenses';
import axios from './axiosInstance';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const tableName = 'expenses'

export const fetchExpenses = async () => {

    const { data } = await axios.get(`${baseUrl}${tableName}`);
    return data as ExpensesList[];

}