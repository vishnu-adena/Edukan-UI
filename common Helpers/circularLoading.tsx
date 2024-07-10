import React from 'react';
import { CircularProgress } from '@mui/material';

const CircularLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin">
        <CircularProgress/>
      </div>
    </div>
  );
};

export default CircularLoading;
