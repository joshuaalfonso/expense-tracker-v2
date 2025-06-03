import axios from "axios"

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const googleAuth = async (idToken: string) => {

    const { data } = await axios.post(`${baseUrl}auth/google`, {idToken: idToken});
    return data
    
}