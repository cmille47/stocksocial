import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, flag, ...rest }) => {
    const navigate = useNavigate();
    const goBackHandler = () => {
        navigate(-1);
    };

    const isAuthorized = () => {
        if (localStorage.getItem("user")) {
            return true;
        } else {
            return false;
        }
    };

    if (!isAuthorized()) {
        return (
            <div>
                <h1>Unauthorized</h1>
                <button onClick={goBackHandler}>Go Back</button>
            </div>
        );
    };

    return (
        <div>
            <Component />
        </div>
    );
};

export default ProtectedRoute;
