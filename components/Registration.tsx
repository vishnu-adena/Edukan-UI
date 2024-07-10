import { useState } from 'react';


const RegistrationPage: React.FC = () => {
    const [name, setName] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [confirmPassword, setConfirmPassword] = useState<any>('');
    const [error, setError] = useState<any>();

    const validatePassword = (password: string) => {
        // Password must contain at least one letter, one number, one special character, and be at least 10 characters long
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            // Check if passwords match
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            // Validate password
            if (!validatePassword(password)) {
                throw new Error("Password must contain at least one letter, one number, one special character, and be at least 10 characters long");
            }
            // Register user
            const data = await registerUser(name, email, password);
            console.log('Registration successful:', data);
            // Redirect user to login page or another page upon successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            setError(error);
            // Handle registration error (e.g., display error message)
        }
    };
    async function registerUser(name: string, email: string, password: string) {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        return data;
      }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
