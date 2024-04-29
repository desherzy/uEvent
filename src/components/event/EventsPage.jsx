import React, {useEffect} from 'react';
import useEventsStore from "../../store/events.js";
import EventItem from "./EventItem.jsx";

const EventsPage = () => {
    const { fetchEvents, events } = useEventsStore();

    useEffect(() => {
        const fetchData = async () => {
            await fetchEvents();
        }

        fetchData();
    }, [fetchEvents]);

    return (
        <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-3">
                {events.map(event => (
                    <div key={event.id} className="p-4">
                        <EventItem event={event}/>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default EventsPage;