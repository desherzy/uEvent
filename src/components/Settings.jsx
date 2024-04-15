import React from 'react';
import {useAuthStore} from "../store/index.js";

function Settings() {
    const { logoutUser } = useAuthStore();

    const handleLogout = async () => {
        await logoutUser()
    }


    return (
        <div>
            ProtectedRoute

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Settings