import React from 'react';
import { Avatar, Box, Text, Flex, Spacer, Divider } from '@chakra-ui/react';

const CommentItem = ({ comment }) => {
    const { firstName, surname, profileImage, content, createdAt } = comment;

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg">
            <Flex align="center">
                <Avatar src={comment.profileImage} alt="img" />
                <Spacer />
                <Text>{firstName} {surname}</Text>
            </Flex>
            <Divider my={2} />
            <Text>{content}</Text>
            <Text mt={2} color="gray.500" fontSize="sm">{createdAt}</Text>
        </Box>
    );
};

export default CommentItem;