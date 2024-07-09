import React, { useEffect } from 'react'
import LoadingPage from './LoadingPage'
import { useNavigate } from 'react-router-dom';

const LoadingFindTransfer = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const timer = setTimeout(() => {
           navigate("/check/face");
        }, 3500);

        return () => clearTimeout(timer);  // Cleanup function to clear the timeout
    }, [navigate]);

  return (
    <div>
        <LoadingPage/>
    </div>
  )
}

export default LoadingFindTransfer