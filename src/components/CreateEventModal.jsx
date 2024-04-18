import React, { useState } from 'react';

const CreateEventModal = ({ isOpen, onClose }) => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [ticketCount, setTicketCount] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [bannerImage, setBannerImage] = useState(null);
    const [eventImage, setEventImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const eventData = {
            eventName,
            description,
            startTime,
            endTime,
            ticketCount,
            ticketPrice,
            bannerImage,
            eventImage
        };

        console.log(eventData);

        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className={`fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">Create Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
                                <input type="text" id="eventName" name="eventName" value={eventName} onChange={e => setEventName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea id="description" name="description" value={description} onChange={e => setDescription(e.target.value)} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                                <input type="datetime-local" id="startTime" name="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                                <input type="datetime-local" id="endTime" name="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="ticketCount" className="block text-sm font-medium text-gray-700">Ticket Count</label>
                                <input type="number" id="ticketCount" name="ticketCount" value={ticketCount} onChange={e => setTicketCount(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">Ticket Price</label>
                                <input type="number" id="ticketPrice" name="ticketPrice" value={ticketPrice} onChange={e => setTicketPrice(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700">Banner Image</label>
                                <input type="file" id="bannerImage" name="bannerImage" onChange={e => setBannerImage(e.target.files[0])} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="eventImage" className="block text-sm font-medium text-gray-700">Event Image</label>
                                <input type="file" id="eventImage" name="eventImage" onChange={e => setEventImage(e.target.files[0])} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                            </div>
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Create Event</button>
                            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md ml-2">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateEventModal;