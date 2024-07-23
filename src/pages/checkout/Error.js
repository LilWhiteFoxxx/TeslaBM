// Error.jsx
import React from 'react';

const Error = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-red-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <svg
                    className="w-12 h-12 mx-auto text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6M12 9v6"
                    />
                </svg>
                <h1 className="text-2xl font-semibold text-gray-800 mt-4">Error</h1>
                <p className="text-gray-600 mt-2">Something went wrong!</p>
            </div>
        </div>
    );
};

export default Error;
