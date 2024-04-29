import { create } from 'zustand';
import $api from '../axios';

const useEventsStore = create((set) => ({
    events: [],
    tickets: [],

    createEvent: async ({ companyId, eventName, description, startTime, endTime, ticketCount, ticketPrice, category, bannerImage, eventImage }) => {
        try {
            const formData = new FormData();
            formData.append('companyId', companyId);
            formData.append('eventName', eventName);
            formData.append('description', description);
            formData.append('startTime', startTime);
            formData.append('endTime', endTime);
            formData.append('ticketCount', ticketCount);
            formData.append('ticketPrice', ticketPrice);
            formData.append('category', category);

            if (bannerImage) {
                formData.append('bannerImage', bannerImage);
            }

            if (eventImage) {
                formData.append('eventImage', eventImage);
            }

            const response = await $api.post('/event/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            set((state) => ({
                events: [...state.events, response.data]
            }));
        } catch (error) {
            console.error('Error creating event:', error);
        }
    },

    fetchEvents: async () => {
        try {
            const response = await $api.get('/event/');

            set({ events: response.data });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    },

    fetchTickets: async () => {
        try {
            const response = await $api.get('/event/tickets');

            set({ tickets: response.data });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    },

    buyTicket: async (eventId) => {
        try {
            const response = await $api.post(`/event/ticket/${eventId}`);
            const ticketData = await response.data;

            set((state) => ({
                tickets: [...state.tickets, ticketData]
            }));


        } catch (error) {
            console.error('Error registering user:', error);
        }
    },

    getEventById: (id) => {
        const event = useEventsStore.getState().events.find((event) => event.id === id);
        return event;
    },

}));


export default useEventsStore;