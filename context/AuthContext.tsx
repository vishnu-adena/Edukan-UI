import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import HTTP from '@/utils/authHttpRequests';

// Define the shape of your user object
interface User {
    name: string;
    email: string;
    // Add more fields as needed
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => Promise.resolve(),
    logout: () => { },
    isAuthenticated: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check if user is already logged in (e.g., token in localStorage)
        const token = localStorage.getItem('access_token');
        if (token) {
            // Fetch user details based on your authentication mechanism
            // HTTP.GET('/auth/user')
            //     .then(response => setUser(response.data))
            //     .catch(error => console.error('Error fetching user:', error));
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // Example of authentication logic
            const response = await axios.post('http://localhost:8081/auth2/login', { email, password }
            );
            const { access_token } = response.data;

            // Store token in localStorage
            localStorage.setItem('access_token', access_token);

            // Fetch user details
            // const userResponse = await axios.get('http://localhost:8081/auth/user', {
            //     headers: {
            //         Authorization: `Bearer ${access_token}`,
            //     },
            // });

            //setUser(userResponse.data);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        setUser(null);
    };

    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
