import React, { useEffect, useState } from 'react';
import { GetCurrentUser } from '../calls/userCalls'; // Assume this fetches the current user
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getValidUser = async () => {
            try {
                const response = await GetCurrentUser(); // API call to get current user
                setUser(response);
            } catch (error) {
                setUser(null);
                navigate('/login'); // Redirect to login on error
            } finally {
                setIsLoading(false); // Stop the loading indicator
            }
        };

        const token = Cookies.get('token'); // Get token from cookies

        if (token) {
            getValidUser(); // Fetch user if token exists
        } else {
            navigate('/login'); // Redirect if no token
        }
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // Simple loading indicator
    }

    return user ? <div>{children}</div> : null; // Render children if user exists
}

export default ProtectedRoute;
