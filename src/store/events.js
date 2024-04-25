import { create } from 'zustand';
import $api from '../axios';

const useEventsStore = create((set) => ({
    events: [],

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



}));


export default useEventsStore;