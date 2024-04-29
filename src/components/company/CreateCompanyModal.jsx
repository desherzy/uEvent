import React, { useState } from 'react';
import useCompaniesStore from "../../store/companies.js";

const CreateCompanyModal = ({ isOpen, onClose }) => {
    const { createCompany } = useCompaniesStore();
    const [companyInfo, setCompanyInfo] = useState({
        name: '',
        description: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo({
            ...companyInfo,
            [name]: value
        });
    };

    const handleCloseModal = () => {
        onClose();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await createCompany(companyInfo);

        setCompanyInfo({
            name: '',
            description: '',
            location: ''
        });
        onClose();
    };

    return (
        <div className={`fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white w-96 p-6 rounded-lg">
                <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold mb-4">Create Company</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input type="text" name="name" value={companyInfo.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description:</label>
                        <input type="text" name="description" value={companyInfo.description} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Location:</label>
                        <input type="text" name="location" value={companyInfo.location} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCompanyModal;