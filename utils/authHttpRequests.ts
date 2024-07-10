import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081', // Replace with your base URL
    timeout: 10000, // Timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the authentication token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); // Or get the token from wherever you store it
        if (token) {
            if (config.headers) {
                (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
            } else {
                
                //config.headers = { Authorization: `Bearer ${token}` };
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Error handling function
const handleError = (error: any) => {
    if (error.response) {
        console.error('Response error:', error.response.data);
    } else if (error.request) {
        console.error('Request error:', error.request);
    } else {
        console.error('Error:', error.message);
    }
    throw error;
};

// HTTP methods encapsulated in an object
const HTTP = {
    GET: async (url: string, params = {}): Promise<any> => {
        try {
            const response = await axiosInstance.get(url, { params });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
    POST: async (url: string, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.post(url, data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
    PUT: async (url: string, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.put(url, data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
    PATCH: async (url: string, data: any): Promise<any> => {
        try {
            const response = await axiosInstance.patch(url, data);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
    DELETE: async (url: string): Promise<any> => {
        try {
            const response = await axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
};

export default HTTP;
