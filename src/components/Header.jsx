import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/index.js";
import { Box, Flex, Input, Link as ChakraLink, Button, Image } from '@chakra-ui/react';

const Header = () => {
    const { isAuthenticated, user } = useAuthStore();

    return (
        <Box bg="gray.800" color="white" py={4}>
            <Flex alignItems="center" justifyContent="space-between" mx="auto" px={4} maxW="xl">
                <Flex alignItems="center">
                    <Image src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-ticket-magic-and-fairy-tale-icongeek26-linear-colour-icongeek26.png" alt="Logo" h={8} mr={4} />
                    <Input
                        type="text"
                        placeholder="Search"
                        bg="gray.700"
                        color="white"
                        px={4}
                        py={2}
                        rounded="md"
                        _focus={{ bg: 'gray.600' }}
                        _placeholder={{ color: 'gray.300' }}
                        focusBorderColor="transparent"
                        outline="none"
                    />
                </Flex>
                <Flex alignItems="center" ml={4}>
                    <ChakraLink as={Link} to="/events" color="white" _hover={{ color: 'gray.300' }} mr={4}>
                        Events
                    </ChakraLink>
                    <ChakraLink as={Link} to="/companies" color="white" _hover={{ color: 'gray.300' }} mr={4}>
                        Companies
                    </ChakraLink>
                    {isAuthenticated && (
                        <ChakraLink as={Link} to="/tickets" color="white" _hover={{ color: 'gray.300' }} mr={4}>
                            Tickets
                        </ChakraLink>
                    )}
                    {isAuthenticated ? (
                        <Link to="/settings">
                            <Image src={user.profileImage} alt="user" h={8} mr={4} />
                        </Link>
                    ) : (
                        <a href="http://localhost:5173/login">
                            <Button bg="blue.500" _hover={{ bg: 'blue.600' }} color="white" fontWeight="bold" py={2} px={4} rounded="md">
                                Login
                            </Button>
                        </a>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
