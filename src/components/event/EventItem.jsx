import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Text, Button } from '@chakra-ui/react';

const EventItem = ({ event }) => {
  const navigate = useNavigate();

  const handleVisitClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Box bg="white" boxShadow="md" rounded="lg" overflow="hidden" w="72">
      <Image src={event.card_image} alt={event.name} h="32" objectFit="cover" objectPosition="center" />
      <Box p="4">
        <Text fontSize="lg" fontWeight="semibold" mb="2">
          {event.name}
        </Text>
        <Text color="gray.700" mb="2">
          {event.description}
        </Text>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text color="gray.600">Ticket Price: {event.ticket_price}</Text>
          <Text color="gray.600">Start Time: {event.start_time}</Text>
        </Box>
        <Text color="gray.600" mb="2">
          End Time: {event.end_time}
        </Text>
        <Button
          mt="2"
          px="4"
          py="2"
          bg="blue.500"
          color="white"
          fontWeight="semibold"
          rounded="lg"
          shadow="md"
          _hover={{ bg: 'blue.600' }}
          onClick={handleVisitClick}
        >
          Go
        </Button>
      </Box>
    </Box>
  );
};

export default EventItem;
