import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI || "https://mern-blog.fly.dev/"
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance