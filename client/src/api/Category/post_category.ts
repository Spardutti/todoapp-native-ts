import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api"

/* ADD A NEW CATEGORY */
const newCategory = async (newCategory: {categoryName: string, token:string}) => {
    try {
        const { categoryName, token} = newCategory

        const response = axios.post(`${devUrl}/newCategory`, {categoryName}, {headers: {
            Authorization: `Bearer ${token}`
        }})
        return response
    } catch (error) {
        return error;
    }
}

const useNewCategory =() => {
    return useMutation(newCategory)
}

export { useNewCategory }