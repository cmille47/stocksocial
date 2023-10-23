import React, { useState, useEffect } from 'react';
import { loginUser } from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";

const AuthLogin = () => {
    const [usercreds, setUsercreds] = useState({
        email: "",
        password: ""
    });
    const [login, setLogin] = useState(false);

    // update usercreds when user fills in form
    const onChange = (e) => {
        e.preventDefault();
        const { name, value: newValue } = e.target;
        setUsercreds({ ...usercreds, [name]: newValue });
    };

    // send request to attempt login w/ parse. return user object if succesful (res)
    const onSubmit = (e) => {
        e.preventDefault();
        loginUser(usercreds).then((res) => {
            setLogin(true);
            console.log("LOGIN SUCCESFUL", res);
        })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <AuthForm
                usercreds={usercreds}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default AuthLogin;
