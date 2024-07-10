import axios from 'axios';

const product = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL, // Set your base URL here
    timeout: 10000, // Set a timeout if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the Authorization header
product.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Custom methods
product.get = (url: string, config?: any) => product.get(url, config);
product.post = (url: string, data?: any, config?: any) => product.post(url, data, config);
product.put = (url: string, data?: any, config?: any) => product.put(url, data, config);
product.delete = (url: string, config?: any) => product.delete(url, config);
product.patch = (url: string, data?: any, config?: any) => product.patch(url, data, config);
// Add more custom methods if needed

export default product;
