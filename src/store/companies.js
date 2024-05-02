import { create } from 'zustand';
import $api from '../axios';

const useCompaniesStore = create((set) => ({
    companies: [],
    userCompanies: [],

    createCompany: async (companyData) => {
        console.log(companyData);
        try {
            const response = await $api.post('/company/', companyData);

            set((state) => ({
                companies: [...state.companies, response.data]
            }));
        } catch (error) {
            console.error('Error registering user:', error);
        }
    },

    fetchCompanies: async () => {
        try {
            const response = await $api.get('/company/');

            set({ companies: response.data });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    },

    fetchUserCompanies: async (userid) => {
        try {
            const response = await $api.get(`/company/user/${userid}`);

            set({ userCompanies: response.data });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    },

    uploadLogo: async (file, companyId) => {
        try {
            const formData = new FormData();
            formData.append('photo', file);
            const response = await $api.patch(`/company/image/${companyId}`, formData);

            const updatedCompany = response.data;

            set((state) => {

                const updatedCompanies = state.companies.map((company) =>
                    company.id === parseInt(companyId) ? updatedCompany : company
                );

                const updatedUserCompanies = state.userCompanies.map((company) =>
                    company.id === parseInt(companyId) ? updatedCompany : company
                );

                return {
                    ...state,
                    companies: updatedCompanies,
                    userCompanies: updatedUserCompanies,
                };
            });
        } catch (error) {
            console.error('Error registering user:', error);
        }
    },

}));


export default useCompaniesStore;