import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!checkUser()) {
            navigate('/');
        }
    }, [navigate]);

    if (checkUser()) {
        return (
            <div>
                <Component />
            </div>
        );
    }
};

export default ProtectedRoute;
