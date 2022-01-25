import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api"

/* ADD A NEW CATEGORY */
const newCategory = async (categoryName: string) => {
    try {
        const response = axios.post(`${devUrl}/newCategory`, {categoryName})
        return response
    } catch (error) {
        return error;
    }
}

const useNewCategory =() => {
    return useMutation(newCategory)
}

export {useNewCategory}