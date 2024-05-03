import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useEventsStore from "../../store/events.js";
import EventMap from "../maps/EventMap.jsx";
import {ModalBody} from "@chakra-ui/react";
import UserList from "../users/UserList.jsx";
import useCommentsStore from "../../store/comments.js";
import CommentForm from "../comment/CommentForm.jsx";
import CommentList from "../comment/CommentsList.jsx";
import {useCompaniesStore} from "../../store/index.js";

const EventPage = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
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
        try {
            await buyTicket(eventId);
            setNotification('Ticket successfully bought!');
            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            console.error('Error buying ticket:', error);
            setNotification('Failed to buy ticket. Please try again later.');
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleDeleteEvent = async () => {
        await deleteEvent(eventId);
        navigate("/events", {replace: true});
    }


    return (
        <div className="container mx-auto px-4 py-16">
            {notification && (
                <div
                    className="fixed top-1 right-0 transform -translate-x-1/2 bg-blue-50 border border-blue-300 rounded p-2 z-10">
                    <p className="text-gray-800">{notification}</p>
                </div>
            )}
            <div className="relative mt-3">
                <img
                    src={event.banner_image}
                    alt={event.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                    <h1 className="text-4xl font-bold text-white">{event.name}</h1>
                </div>
            </div>
            <div className="flex flex-col md:flex-row mt-8">
                <div className="w-full md:w-1/3">
                    <img
                        src={event.card_image}
                        alt={event.name}
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <div className="w-full md:w-2/3 md:pl-8">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-gray-600 mb-4">
                        {event.description.split("\r\n").map((line, index) => (
                            <span key={index}>
                {line}
                                <br/>
              </span>
                        ))}
                    </p>
                    <h2 className="text-2xl font-bold mb-4">Details</h2>
                    <p className="text-gray-600 mb-4">
                        Maximum amount of tickets: {event.tickets_maximal_amount}
                    </p>
                    <p className="text-gray-600 mb-4">
                        Ticket price: {event.ticket_price}
                    </p>
                    <p className="text-gray-600 mb-4">
                        Category: {event.categoryName}
                    </p>
                    <p className="text-gray-600 mb-4">
                        Start time: {new Date(event.start_time).toLocaleString()}
                    </p>
                    <p className="text-gray-600 mb-4">
                        End time: {new Date(event.end_time).toLocaleString()}
                    </p>

                    <h2 className="text-2xl font-bold mb-4">Company</h2>
                    <div className="text-gray-600 mb-4 flex items-center">
                        <img src={company.logo} alt="Company Logo" className="w-4 h-4 rounded-full mr-2"/>
                        <p className="mb-0">{company.name}</p>
                    </div>

                    <div className="text-gray-600 mb-4">
                        {company.location}
                    </div>

                    <p className="text-gray-600 mb-4">
                        event Created at: {new Date(event.createdAt).toLocaleString()}
                    </p>
                    <div className="mt-8">
                        <button onClick={handleBuyTicket}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Buy Ticket
                        </button>
                        {isUserCompany() && (
                            <button onClick={handleDeleteEvent}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete Event
                            </button>
                        )}
                    </div>

                </div>
            </div>
            <div className='mt-5'>
                <div style={{position: 'relative', margin: 'auto', height: '400px', width: '60%', overflow: 'hidden'}}>
                    <EventMap event={event}/>
                </div>
            </div>
            <UserList eventUsers={eventUsers} />
            <CommentForm eventId={eventId}/>
            <CommentList comments={comments} />
        </div>
    );
};

export default EventPage;