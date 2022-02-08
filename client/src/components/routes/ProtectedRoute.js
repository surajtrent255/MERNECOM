import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const {isAuthenticated, user, loading } = useSelector(state => state.auth ); // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page

    const location  = useLocation();
    if(isAuthenticated){
        if (props.isAdmin === true && user.role == 'admin') {
            return <Outlet /> 
        } 
        if (props.isUser === true && user.role == 'user') {
            return <Outlet /> 
        } 

        return <Navigate to="/login" />    
        
    }
     else {

        console.log(" inside else ******************************************************^^^^^^^^^&&&&&&&&&&")
        return <Navigate to="/login" state = {{from : location }} replace />
    }
}

export default ProtectedRoute;
