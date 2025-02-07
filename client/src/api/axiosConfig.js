import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL

if (!baseURL) throw new Error("Database URL is required but not defined.")

export default axios.create({ baseURL })