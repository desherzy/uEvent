import React, { useEffect } from 'react';
import {Box, Flex, List, Text, ListItem, useColorModeValue} from '@chakra-ui/react';
import UserCard from "./UserCard.jsx";


function UserList({eventUsers}) {
    if (eventUsers.length === 0) {
        return (
            <Flex justify="center" marginTop="20px" marginBottom="20px">
                <Text fontSize="xl" fontWeight="bold" color="gray.500">No participants yet</Text>
            </Flex>
        );
    }


    return (
        <Flex justify="center">
            <Box width="50%">
                <Box textAlign="center" fontSize="xl" fontWeight="bold" mb={4}>Members</Box>
                <List overflowY="auto" height="30vh" spacing={4} paddingY={4}>
                    {eventUsers.map((participant) => (
                        <ListItem key={participant.id} bg="#ccd9c0" padding={3} borderRadius={4} boxShadow="md">
                            <UserCard user={participant} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Flex>
    );
}

export default UserList;