import React from 'react';
import { CircularProgress } from '@mui/material';

export const CircularLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin">
        <CircularProgress/>
      </div>
    </div>
  );
};


export const LoadingOverlay: React.FC = () => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

