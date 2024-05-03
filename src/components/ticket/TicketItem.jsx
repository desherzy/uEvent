import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useEventsStore from '../../store/events';

const TicketItem = ({ ticket }) => {
    const { getEventById } = useEventsStore();
    const event = getEventById(ticket.event_id);
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate(`/events/${ticket.event_id}`);
    };

    return (
        <Box bg="white" boxShadow="md" rounded="md" p={6} mb={4}>
            <Flex alignItems="center" mb={4}>
                <Image src={event.card_image} alt={event.name} boxSize="100px" rounded="full" mr={4} />
                <div>
                    <Text fontSize="lg" fontWeight="bold">
                        {event.name}
                    </Text>
                    <Text color="gray.600"> Begin: {new Date(event.start_time).toLocaleString()}</Text>
                </div>
            </Flex>
            <Flex justify="space-between" mb={4}>
                <Text fontSize="14">Bought at: {new Date(ticket.createdAt).toLocaleString()}</Text>
                <Text borderRadius="0.5rem" bg='orange.500' textAlign="center" fontWeight="bold" textColor="white" w="7%" h="30px">{ticket.status}</Text>
            </Flex>
            <Button
                onClick={handleVisitClick}
                bg="orange.500"
                _hover={{ bg: 'orange.700' }}
                color="white"
                fontWeight="bold"
                py={2}
                px={4}
                rounded="md"
            >
                View
            </Button>
        </Box>
    );
};

export default TicketItem;
