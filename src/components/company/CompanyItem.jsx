import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const CompanyItem = ({ company }) => {
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate(`/company/${company.id}`);
    };

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    };

    return (
        <Box borderWidth="1px" borderRadius="md" borderColor="black" p="2" mb="2" backgroundColor="#E2E8F0">
            <Heading as="h3" size="md" fontWeight="semibold" mb="2" margin="a">
                {company.name}
            </Heading>
            <Text color="gray.600" mb="2">
                {truncateDescription(company.description, 100)}
            </Text>
            <Text fontSize="sm" color="gray.500" mb="2">
                {company.location}
            </Text>
            <Button
                onClick={handleVisitClick}
                mt="2"
                px="4"
                py="2"
                bg="blue.500"
                color="white"
                fontWeight="semibold"
                rounded="lg"
                shadow="md"
                _hover={{ bg: 'blue.600' }}
                _focus={{ outline: 'none', bg: 'blue.600' }}
            >
                Go
            </Button>
        </Box>
    );
};

export default CompanyItem;
