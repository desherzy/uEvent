import React from 'react';
import { VStack } from '@chakra-ui/react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
    return (
        <VStack spacing={4} align="stretch">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </VStack>
    );
};

export default CommentList;