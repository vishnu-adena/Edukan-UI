import React, { useState } from 'react';
import Head from 'next/head';
import Logo from '../public/logo.jpg';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import {LoadingOverlay} from '../common Helpers/circularLoading'; // Import the overlay

const SSOLogin: React.FC = () => {
    const { login: contextLogin, oauthLogin, loading } = useAuth(); // Use loading state
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading,setIsLoading]= useState<boolean>(false)

    const handleSSOLogin = () => {
        oauthLogin();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await contextLogin(email, password);
        } catch (error) {
            console.error('Login failed:', error);
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.classList.remove('hidden');
                errorMessage.textContent = 'Invalid email or password';
            }
        }
        finally{
            setIsLoading(false)
        }
    };

    return (
        <>
            <Head>
                <title>SSO Login</title>
            </Head>
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md border-t border-gray-200 w-full max-w-md">
                    <div className="text-center mb-6">
                        <Image src={Logo} alt="Logo" className="w-20 mx-auto" />
                        <h1 className="text-2xl font-bold">SSO Login</h1>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    value={password}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                        <div id="error-message" className="text-red-500 text-sm text-center mt-4 hidden">
                            Error message goes here
                        </div>
                        <div className="text-sm text-center">
                            <p className="text-gray-600">Or sign in with</p>
                            <div className="flex space-x-4 justify-center mt-3">
                                <button 
                                    type="button"
                                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                                    onClick={handleSSOLogin}
                                >
                                    E-Dukan OAuth2
                                </button>
                                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-md">
                                    GitHub
                                </button>
                                <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
                                    Microsoft
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {isLoading && <LoadingOverlay />} {/* Show the overlay when loading */}
            </div>
        </>
    );
};

export default SSOLogin;
