import React from 'react';
import {useParams} from "react-router-dom";
import useEventsStore from "../store/events.js";

const EventPage = () => {
    const { eventId } = useParams();
    const { events } = useEventsStore();
    const event = events.find(ev => ev.id === parseInt(eventId));


    return (
        <div className="container mx-auto px-4 py-16">
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
                        Start time: {new Date(event.start_time).toLocaleString()}
                    </p>
                    <p className="text-gray-600 mb-4">
                        End time: {new Date(event.end_time).toLocaleString()}
                    </p>
                    <h2 className="text-2xl font-bold mb-4">Company</h2>
                    <p className="text-gray-600 mb-4">
                        Company ID: {event.company_id}
                    </p>
                    <p className="text-gray-600 mb-4">
                        Created at: {new Date(event.createdAt).toLocaleString()}
                    </p>
                    <p className="text-gray-600 mb-4">
                        Updated at: {new Date(event.updatedAt).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="mt-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Buy Ticket
                </button>
            </div>
        </div>
    );
};

export default EventPage;