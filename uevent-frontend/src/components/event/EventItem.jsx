import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Image, Text, Button, Tag} from '@chakra-ui/react';

const EventItem = ({ event }) => {
  const navigate = useNavigate();

  const handleVisitClick = () => {
    navigate(`/events/${event.id}`);
  };

  const truncateDescription = (description) => {
    if (description.length > 30) {
      return description.substring(0, 30) + '...';
    }
    return description;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString() + ", " + new Date(date).toLocaleTimeString();
  };

  return (
      <Box className="bg-white shadow-md rounded-lg overflow-hidden w-72">
        <img className="w-full h-32 object-cover object-center" src={event.card_image} alt={event.name} />
        <Box p={4}>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>{event.name}</Text>
          <Text color="gray.700" mb={2} noOfLines={3}>{truncateDescription(event.description)}</Text>
          <Box display="flex" alignItems="center" mb={2}>
            <Tag colorScheme="green" variant="solid" size="md" mr={4}>
              {event.ticket_price}$
            </Tag>
            <Tag colorScheme="blue" variant="solid" size="md" mr={4}>
              {event.categoryName}
            </Tag>
          </Box>
          <Box bg="gray.100" p={2} borderRadius="md">
            <Text color="gray.600" fontWeight="bold">Start Time:</Text>
            <Text color="gray.600" fontSize="sm">{formatDate(event.start_time)}</Text>
          </Box>
          <Box bg="gray.100" p={2} borderRadius="md">
            <Text color="gray.600" fontWeight="bold">End Time:</Text>
            <Text color="gray.600" fontSize="sm">{formatDate(event.end_time)}</Text>
          </Box>
          <Button onClick={handleVisitClick} width="100%" colorScheme="blue" mt={2} px={4} py={2} fontWeight="semibold" rounded="lg" shadow="md" _hover={{ bg: "blue.600" }}>
            Visit
          </Button>
        </Box>
      </Box>
  );
};

export default EventItem;
