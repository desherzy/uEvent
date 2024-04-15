import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loginUser, isAuthenticated, error } = useAuthStore();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
    if (isAuthenticated === true) {
        navigate("/settings", {replace: true});
    }
    }, [isAuthenticated]);

    useEffect(() => {
    if (loginSuccess) {
        navigate('/settings');
    }
    }, [loginSuccess, navigate]);


    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await loginUser(formData);
        setLoginSuccess(true);
    } catch (error) {
        console.error('Error logging in:', error);
        setShowAlert(true);
    }};

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={formData.email} onChange={handleChange}/>
                <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;