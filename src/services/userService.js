// src/services/userService.js

import axiosInstance from "./axiosInstance";

export const loginUser = async (username, password) => {
    const response = await axiosInstance.post('/api/login/', { username, password });
    return response.data;
};

export const deleteStorage = ()=>{
    localStorage.removeItem("student_id")
    localStorage.removeItem("user_id")

}