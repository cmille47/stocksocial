import React, { useEffect, useState} from "react";
import {
    getAllUsers
} from "../../Common/Services/UserService.js";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users);
        });
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <div>
            This is the users list.
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.get("username")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;