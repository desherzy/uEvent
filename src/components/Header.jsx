import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/index.js';
import {
  Box,
  Flex,
  Input,
  Link as ChakraLink,
  Button,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';


const Header = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Box bg="white" color="white" py={4}>
      <Flex alignItems="center" justifyContent="space-between" mx="auto" maxW="50%">
        <Flex alignItems="center" w="80%">
          <Link to="/">
            <Image
              src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-ticket-magic-and-fairy-tale-icongeek26-linear-colour-icongeek26.png"
              alt="Logo"
              h={10}
              mr={4}
            />
          </Link>
          <Input
            type="text"
            placeholder="Search"
            bg="white"
            color="white"
            rounded="md"
            textColor="black"
            border="1px"
            borderColor="black"
          />
        </Flex>
        <Flex alignItems="center" ml={4}>
        <Menu>
            <MenuButton
              as={Button}
              bg="transparent"
              color="black"
              _hover={{ color: 'gray.300' }}
              _expanded={{ bg: 'white.600' }}
              border="1px" borderColor="black"
              mr={3}
              w="50%"
            >
              Menu
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/events" textColor="black">
                Events
              </MenuItem>
              <MenuItem as={Link} to="/companies" textColor="black">
                Companies
              </MenuItem>
              {isAuthenticated && (
                <MenuItem as={Link} to="/tickets" textColor="black">
                  Tickets
                </MenuItem>
              )}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="transparent"
              color="black"
              _hover={{ color: 'white.300' }}
              _expanded={{ bg: 'white.600' }}
              border="1px" borderColor="black"
              w="80%"
            >
              {isAuthenticated ? (
                <Flex alignItems="center">
                  <Image src={user.profileImage} 
                    alt="user" 
                    borderRadius="full" 
                    boxSize={8} 
                    mr={2} 
                />
                  <Text>{user.firstName}</Text>
                </Flex>
              ) : (
                'Login'
              )}
            </MenuButton>
            <MenuList>
              {isAuthenticated ? (
                <MenuItem as={Link} to="/settings" textColor="black">Settings</MenuItem>
                
              ) : (
                <MenuItem as={Link} to="/login" textColor="black">Login</MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
