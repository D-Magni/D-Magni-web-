import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {

    
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-semibold text-gray-800">Success!</h1>
          <p className="mt-2 text-gray-600">Your Order has been processed.</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
