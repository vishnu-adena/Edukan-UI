import React from 'react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const ProtectedPage: React.FC = () => {
    return (
        <ProtectedRoute>
            
                <h1>Protected Page</h1>
                <p>This is a protected page.</p>
            
        </ProtectedRoute>
    );
};

export default ProtectedPage;
