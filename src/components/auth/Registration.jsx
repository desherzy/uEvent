import React, { useEffect, useState } from 'react';
import useAuthStore from '../../store/auth.js';
import { useNavigate } from 'react-router-dom';

import { Button, Box, Heading, Text, FormControl, Input, FormErrorMessage } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react'
import Image from '../../assets/background.jpg';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', surname: '',  email: '', password: '', repeatPassword: '' });
  const { registerUser, error, isAuthenticated } = useAuthStore();
  const [errors, setErrors] = useState({});

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

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrors({ password: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'});
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setErrors({ repeatPassword: 'Passwords do not match.' });
      return;
    }

    try {
      await registerUser(formData);
      console.log('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
    }
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
          <Heading textAlign='center' fontSize={24} mb={4}>Welcome newbie!</Heading>
          <Text fontSize={18} textAlign='center' w='95%'>
            Welcome to our website! Here, you can find tickets to the best events and gatherings in your city. Join our community to access exciting events and unforgettable experiences. Choose your favorite event today and get ready for a great time with us!
          </Text>
        </Box>
        <Box w='25%' h='550px' borderRadius='0 1rem 1rem 0' p={10} backgroundColor='#E2E8F0' textAlign="center">
          <Heading textAlign='center' fontSize={30} mb={4}>Sign Up</Heading>
          <form onSubmit={handleSubmit}>

            <FormControl id="firstName" mb={4} borderColor='black'>
              <Input type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    placeholder="First name"/>
            </FormControl>

            <FormControl id="surname" mb={4} borderColor='black'>
              <Input type="text" 
                    name="surname" 
                    value={formData.surname} 
                    onChange={handleChange} 
                    placeholder="Second name"/>
            </FormControl>

            <FormControl id="email" mb={4} borderColor='black'>
              <Input type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email"/>
            </FormControl>

            <FormControl id="password" mb={4} borderColor='black' isInvalid={!!errors.password}>
              <Input type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password"/>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl id="repeatPassword" mb={4} borderColor='black' isInvalid={!!errors.repeatPassword}>
              <Input type="password"
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    placeholder="Repeat Password"/>
              <FormErrorMessage>{errors.repeatPassword}</FormErrorMessage>
            </FormControl>

            <Button type="submit" w='auto' color='#49AA87' alignSelf='center'>Continue</Button>
          
          </form>
          <Box mt={3}>
            <Text>Already have an account?</Text>
            <ChakraLink as={ReactRouterLink} to='/login' textColor='blue'>Sign in here.</ChakraLink>
          </Box>
        </Box>
      </div>
  );
}

export default Registration;