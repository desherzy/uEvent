import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import EventItem from './EventItem';

const EventCarousel = ({ events }) => {
    const [currentEventIndex, setCurrentEventIndex] = React.useState(0);

    const handleNext = () => {
        setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    };

    const handlePrev = () => {
        setCurrentEventIndex((prevIndex) =>
            prevIndex === 0 ? events.length - 1 : prevIndex - 1
        );
    };

    // Отримуємо індекси для трьох подій, які будуть відображатися
    const index1 = currentEventIndex % events.length;
    const index2 = (currentEventIndex + 1) % events.length;
    const index3 = (currentEventIndex + 2) % events.length;

    return (
        <Box align="center">
            <Box margin={5} w="70%">
                <Flex justify="space-around" align="center" margin={5}>
                    {/* Кнопка "Previous" */}
                    <Button onClick={handlePrev}>Previous</Button>
                    
                    {/* Компоненти <EventItem> з меншою відстанню між ними */}
                    <EventItem event={events[index1]} mb={2} />
                    <EventItem event={events[index2]} mb={2} />
                    <EventItem event={events[index3]} mb={2} />

                    {/* Кнопка "Next" */}
                    <Button onClick={handleNext}>Next</Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default EventCarousel;
