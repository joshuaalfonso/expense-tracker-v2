import type { DashboardSummary } from '@/models/dashboard';
import axios from './axiosInstance';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const tableName = 'dashboard'

export const fetchDashboardSummary = async () => {

    const { data } = await axios.get(`${baseUrl}${tableName}/summary`);
    return data as DashboardSummary

}