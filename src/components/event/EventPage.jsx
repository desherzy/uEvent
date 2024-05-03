import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuthStore} from "../../store/index.js"
import useEventsStore from "../../store/events.js";
import EventMap from "../maps/EventMap.jsx";
import {Box, 
    Button,
    Heading,
    Flex,
    Center,
    Image,
    Text,
    ModalBody} from "@chakra-ui/react";
import UserList from "../users/UserList.jsx";
import useCommentsStore from "../../store/comments.js";
import CommentForm from "../comment/CommentForm.jsx";
import CommentList from "../comment/CommentsList.jsx";
import {useCompaniesStore} from "../../store/index.js";

const EventPage = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const { userId } = useAuthStore();
    const { events, buyTicket, fetchEventUsers, eventUsers, deleteEvent } = useEventsStore();
    const { comments, fetchEventComments } = useCommentsStore();
    const { getCompanyById, userCompanies } = useCompaniesStore();
    const event = events.find(ev => ev.id === parseInt(eventId));
    const company = getCompanyById(event.company_id);
    const [notification, setNotification] = useState(null);
    const [eventLocation, setEventLocation] = useState({ lat: event.latitude, lng: event.longitude });

    const isUserCompany = () => {
        return userCompanies.some(userCompany => userCompany.id === company.id);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchEventUsers(eventId);
                await fetchEventComments(eventId);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [fetchEventUsers]);

    const handleBuyTicket = async () => {
        fetch(
            "http://localhost:3001/buy_tickets/:" + userId,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventId: eventId,
                    ticketsQuantity: 1
                })
            }
        ).then(
            function(res) {
                if (res.ok) {
                    return res.json()
                }
                return res.json().then(json => Promise.reject(json))
            }
        ).then(
            function({url}) {
                window.location = url
            }
        ).catch(
            function(err) {
                console.error(err.error)
            }
        )
    };

    const handleDeleteEvent = async () => {
        await deleteEvent(eventId);
        navigate("/events", {replace: true});
    };

  return (
      <Box mx="auto" px={4} py={16} className="container">
          {notification && (
              <Box className="fixed top-1 right-0 transform -translate-x-1/2 bg-blue-50 border border-blue-300 rounded p-2 z-10" p={2}>
                  <Text className="text-gray-800">{notification}</Text>
              </Box>
          )}
          <Box w="100%" backgroundColor="#E2E8F0" borderRadius="1rem">
              <Box position="relative" color='red'>
                  <Box position="absolute" top="40px" left="20px" zIndex="1">
                      <Heading as="h1" size="xl" color="white" fontWeight="bold" fontSize="30">
                          {event.name}
                      </Heading>
                      <Heading as="h1" size="xl" color="white" fontSize="20" marginLeft={5}>
                          <Link to={`/company/${company.id}`}>
                              by {company.name}
                          </Link>
                      </Heading>
                  </Box>
                  <Box position="absolute" top="30px" right="20px" zIndex="1">
                      <Heading as="h1" size="xl" color="white" fontWeight="bold" fontSize="30">
                          {event.categoryName}
                      </Heading>
                  </Box>
                  <Image
                      src={event.banner_image}
                      alt={event.name}
                      w="100%"
                      h="60vh"
                      objectFit="cover"
                      rounded="1rem 1rem 0 0"
                      filter="blur(1px)"
                  />
              </Box>

              <Flex justify="space-around" margin="10">
                  <Box w="70%" mx="auto" textAlign="left">
                      <Text fontSize="18" mb={4}>
                          {event.description}
                      </Text>
                  </Box>

                  <Box w='30%'
                       h='250px'
                       borderRadius='1rem'
                       margin='10'
                       padding='5'
                       backgroundColor='#49AA87'
                       textAlign="center"
                  >
                      {/* Buy button */}
                      <Text fontSize="30" fontWeight="bold" color="white">Date & Time</Text>
                      <Text fontWeight="bold" color="white" mb="10">{new Date(event.start_time).toLocaleString()}</Text>
                      <Button
                          onClick={handleBuyTicket}
                          color="#49AA87"
                          fontWeight="bold"
                          mb="1"
                      >
                          Buy Ticket
                      </Button>
                      <Text fontWeight="bold" fontSize="25" color="yellow">{event.ticket_price}$</Text>
                      <Text fontWeight="bold" color="white">Available tickets: {event.tickets_maximal_amount}</Text>
                  </Box>
              </Flex>

              <Box mt="5" width="80%" mx="auto">
                  {/* Map */}
                  <Text textAlign="center" fontSize="30" fontWeight="bold">Location</Text>
                  <Box style={{ position: 'relative', margin: 'auto', height: '400px', width: '100%', overflow: 'hidden' }}>
                      <EventMap event={event} />
                  </Box>
              </Box>

              <Center mt="5">
                  <UserList eventUsers={eventUsers} />
              </Center>

              <Center mt="5">
                  {isUserCompany() && (
                      <Button type="button" color='red' onClick={handleDeleteEvent} mb="5">Delete event</Button>
                  )}
              </Center>
          </Box>
          <CommentForm eventId={eventId} />
          <CommentList comments={comments} />
      </Box>
  );
};

export default EventPage;
