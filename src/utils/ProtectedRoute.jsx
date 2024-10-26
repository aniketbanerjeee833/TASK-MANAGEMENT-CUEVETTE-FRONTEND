import React from 'react'
import { Navigate } from 'react-router-dom';


    const ProtectedRoute = ({ children }) => {
        const token=JSON.parse(localStorage.getItem("APP-TOKEN"))
    
        // If no token, redirect to login page
        if (!token) {
          return <Navigate to="/login" />;
        }
      
        return children; // If authenticated, render the component
      };



export default ProtectedRoute
