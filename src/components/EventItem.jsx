import React from 'react';
import {useNavigate} from "react-router-dom";

const EventItem = ({event}) => {
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate(`/events/${event.id}`);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-72">
            <img className="w-full h-32 object-cover object-center" src={event.card_image} alt={event.name}/>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                <p className="text-gray-700 mb-2">{event.description}</p>
                <div className="flex justify-between items-center">
                    <p className="text-gray-600">Ticket Price: {event.ticket_price}</p>
                    <p className="text-gray-600">Start Time: {event.start_time}</p>
                </div>
                <p className="text-gray-600">End Time: {event.end_time}</p>
                <button onClick={handleVisitClick}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Go
                </button>
            </div>
        </div>
    );
};

export default EventItem;