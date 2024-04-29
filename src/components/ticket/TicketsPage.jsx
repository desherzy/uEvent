import React, {useEffect, useState} from 'react';
import useEventsStore from "../../store/events.js";
import TicketItem from "./TicketItem.jsx";

const TicketsPage = () => {
    const { tickets,fetchTickets } = useEventsStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await fetchTickets();
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            {loading ? (
                <div className="text-lg text-gray-600">Loading...</div>
            ) : (
                <div>
                    <h2 className="text-3xl font-bold mb-4">Ticket List</h2>
                    {(Array.isArray(tickets) && tickets.length > 0) ? (
                        tickets.map(ticket => (
                            <TicketItem key={ticket.id} ticket={ticket}/>
                        ))
                    ) : (
                        <div className="text-lg text-gray-600">No tickets available.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TicketsPage;