
import type { CategoriesList, CategoriesPost } from "@/models/categories";
// import axios from "axios";
import axios from './axiosInstance';


const baseUrl = import.meta.env.VITE_API_BASE_URL;
const tableName = 'categories'

export const fetchCategories = async () => {

    const { data } = await axios.get(`${baseUrl}${tableName}`);
    return data as CategoriesList[]

}

export const createCategories = async (category: CategoriesPost) => {
    const { data } = await axios.post(`${baseUrl}${tableName}`, category);
    return data;
}

export const editCategories = async (category: CategoriesPost) => {
    const { data } = await axios.put(`${baseUrl}${tableName}${'/' + category.id}`, category);
    return data;
}


export const deleteCategory = async (category_id: number) => {
      const { data } = await axios.delete(`${baseUrl}${tableName}${'/' + category_id}`);
    return data;
}

