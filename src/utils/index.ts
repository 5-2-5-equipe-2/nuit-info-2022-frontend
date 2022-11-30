import axios from "axios";

export const PUBLIC_API_URL = "http://127.0.0.1:8000/api";


export const axiosPublic = axios.create({baseURL: PUBLIC_API_URL});
