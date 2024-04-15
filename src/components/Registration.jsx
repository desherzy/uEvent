import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/auth';
import { useNavigate } from 'react-router-dom';


function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: '',  email: '', password: '' });
  const { registerUser, error, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated === true) {
        navigate("/settings", {replace: true});
    }
    }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      console.log('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  return (
      <div>
          <h1>Registration Page</h1>
          <form onSubmit={handleSubmit}>
              <input type="email" name="email" value={formData.email} onChange={handleChange}/>
              <input type="text" name="login" value={formData.username} onChange={handleChange}/>
              <input type="password" name="password" value={formData.password} onChange={handleChange}/>
              <button type="submit">Sign up</button>
          </form>
      </div>
  );
}

export default Registration;