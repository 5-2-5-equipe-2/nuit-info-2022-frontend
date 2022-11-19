import axios from "axios";

export const PUBLIC_API_URL = "http://localhost:8080/api/public";
export const PRIVATE_API_URL = "http://localhost:8080/api/private";


export const axiosPublic = axios.create({baseURL: PUBLIC_API_URL});
