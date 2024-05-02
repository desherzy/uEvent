import React, {useState} from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    useColorModeValue,
    FormErrorMessage,
} from '@chakra-ui/react';
import {useCommentsStore} from "../../store/index.js";

const CommentForm = ({ eventId }) => {
    const [content, setContent] = useState("");
    const { createComment } = useCommentsStore();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await createComment(content, eventId);
    };

    return (

        <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={8}
            rounded="md"
            shadow="md"
            maxW="full"
            mx="auto"
            my={10}
        >
            <FormControl id="comment" mb={4} isRequired isInvalid={false}>
                <FormLabel fontWeight="bold" htmlFor="comment">
                    Your Thoughts
                </FormLabel>
                <Input
                    id="comment"
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your comment here"
                    h={20}
                    borderRadius="md"
                    _focus={{
                        boxShadow: '0 0 0 2px #007bff',
                        borderColor: '#007bff',
                    }}
                    _hover={{
                        borderColor: '#007bff',
                    }}
                />
                <FormErrorMessage>Comment is required.</FormErrorMessage>
            </FormControl>
            <Flex justifyContent="flex-end">
                <Button
                    onClick={handleSubmit}
                    colorScheme="purple"
                    variant="solid"
                    size="md"
                    fontWeight="bold"
                    px={6}
                    py={3}
                    borderRadius="md"
                    _hover={{
                        bg: 'purple.700',
                    }}
                >
                    Submit
                </Button>
            </Flex>
        </Box>
    );
};

export default CommentForm;