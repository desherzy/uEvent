import React from 'react';
import { Box, Text, Grid, Button } from '@chakra-ui/react';
import useEventsStore from '../store/events';
import EventCarousel from './event/EventCarousel';


function Main() {
    const { events } = useEventsStore();

    return (
        <Box p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign='center'>
                Available events now!
            </Text>
            {events.length > 0 ? (
                <EventCarousel events={events} />
            ) : (
                <Text>No events to display.</Text>
            )}
        </Box>
    );
}

export default Main;