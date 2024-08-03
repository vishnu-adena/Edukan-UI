import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface User {
    email: string;
    name: string;

    // Add other user properties as needed
}

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<void>;
    oauthLogin: () => void;
    logout: () => void;
    token:string|null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const apiGateway = '/api/';
    const userServiceId = process.env.NEXT_PUBLIC_USER_SERVICE;

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token)
        if (token) {
            // Validate the token
            axios.get(`${apiGateway}/${userServiceId}/auth/validate-token`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(() => {
                    // If token is valid, fetch user details
                    fetchUserDetails(token);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserDetails = async (token: string) => {
        try {
            const response = await axios.get(`${apiGateway}/${userServiceId}/auth/user`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user details', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username: string, password: string) => {
        try {
            debugger
            const response = await axios.post(`${apiGateway}/${userServiceId}/auth2/login`, { email: username, password });
            const token = response?.data?.access_token;
            localStorage.setItem('token', token);
            await fetchUserDetails(token);
            window.location.href='/';
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const oauthLogin = () => {
        const oauthUrl = `/api/userservice/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_OAUTH_SCOPE}`;
        window.location.href = oauthUrl;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, oauthLogin, logout, loading, isLoggedIn: !!user ,token}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
