import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth.js';


import { Button, Box, Heading, Text, FormControl, Input, FormErrorMessage } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react'
import Image from '../../assets/background.jpg';
import Logo from '../../assets/Logo.png';

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

    const handleForgotPassword = () => {
        navigate('/password-reset'); //TODO: need end point
    };

    return (
        <div style={{
            backgroundImage: `url(${Image})`,
            backgroundSize: 'cover',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            filter: 'blur(0px)',
        }} display="flex">
            <Box w='20%' h='550px' borderRadius='1rem 0 0 1rem' p={12} backgroundColor='#49AA87' overflowY="auto">
                <ReactRouterLink to="/">
                    <img src={Logo} alt="Logo" style={{ width: '90px', marginBottom: '20px', display: 'block', margin: 'auto' }} />
                </ReactRouterLink>
                <Heading textAlign='center' fontSize={24} mb={4}>Welcome back!</Heading>
                <Text fontSize={18} textAlign='center' w='95%'>
                    Here, you can find tickets to the best events and gatherings in your city. Join our community to access exciting events and unforgettable experiences. Choose your favorite event today and get ready for a great time with us!
                </Text>
            </Box>
            <Box w='25%' h='550px' borderRadius='0 1rem 1rem 0' p={10} backgroundColor='#E2E8F0' textAlign="center">
                <Heading textAlign='center' fontSize={30} mb={4}>Sign In</Heading>
                <form onSubmit={handleSubmit}>
                <FormControl id="email" mb={4} borderColor='black'>
                    
                    <Input type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Email"/>
                    </FormControl>
                    
                    <FormControl id="password" mb={4} borderColor='black'>
                        <Input type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder="Password"/>
                    </FormControl>

                    <Button type="submit" w='auto' color='#49AA87' alignSelf='center' m={3}>Continue</Button>
                    <Button type="button" w='auto' color='red' alignSelf='center' onClick={handleForgotPassword}>Forgot password? (don't work)</Button>
                </form>
                <Box mt={3}>
                    <Text>Don't have an account?</Text>
                    <ChakraLink as={ReactRouterLink} to='/registration' textColor='blue'>Register here.</ChakraLink>
                </Box>
            </Box>
        </div>
    );
}

export default Login;