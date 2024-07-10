import Link from 'next/link';
import React from 'react';

const RegistrationSuccessPage: React.FC = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Registration Successful!</h2>
        <div className="mb-4">
          <p className="text-gray-700">Thank you for registering:</p>
          <p className="text-gray-700">Name: {}</p>
          <p className="text-gray-700">Email: {}</p>
        </div>
        <p className="text-green-500 text-sm mb-4">Your registration was successful.</p>
        <Link href="/" className="block text-center text-blue-600 hover:text-blue-700">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
