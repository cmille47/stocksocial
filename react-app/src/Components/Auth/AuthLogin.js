import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser, loginUser } from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";

const AuthLogin = () => {
    const history = useNavigate();

    const [usercreds, setUsercreds] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (checkUser()) {
            alert('You are already logged in!');
            history('/dashboard');
        }
    }, [history]);

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
            localStorage.setItem('user', JSON.stringify(res));
            history('/dashboard'); // navigate to dashboard on successful login
        })
        .catch((err) => {
            console.log(err);
            // NEED TO ADD ALERT LOGIC OR SOMETHING HERE
        });
    };

    return (
        <div>
            <AuthForm
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default AuthLogin;
