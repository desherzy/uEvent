import React from 'react';
import useEventsStore from "../../store/events.js";
import {useNavigate} from "react-router-dom";

const TicketItem = ({ ticket }) => {
    const { getEventById } = useEventsStore();
    const event = getEventById(ticket.event_id);
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate(`/events/${ticket.event_id}`);
    };


    return (
        <div className="bg-white shadow-md rounded px-4 py-6 mb-4">
            <div className="flex items-center mb-4">
                <img src={event.card_image} alt={event.name} className="w-24 h-24 rounded-full mr-4"/>
                <div>
                    <h3 className="text-lg font-bold">{event.name}</h3>
                    <p className="text-gray-600">{event.start_time}</p>
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <p>Bought at: {ticket.createdAt}</p>
                <p>Status: {ticket.status}</p>
            </div>
            <button onClick={handleVisitClick}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                View
            </button>
        </div>
    );
};

export default TicketItem;