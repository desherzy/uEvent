import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useCompaniesStore} from "../../store/index.js";
import CreateEventModal from "../event/CreateEventModal.jsx";

const CompanyPage = () => {
    const { companyId } = useParams();
    const { companies, userCompanies, uploadLogo } = useCompaniesStore();
    const selectedCompany = companies.find(company => company.id === parseInt(companyId));
    const isOwner = userCompanies.some(company => company.id === parseInt(companyId));
    const [isCreateEventModalOpen, setCreateEventModalOpen] = useState(false);

    const handleCreateEventClick = () => {
        setCreateEventModalOpen(true);
    };

    const handleCloseModal = () => {
        setCreateEventModalOpen(false);
    };

    if (!selectedCompany) {
        return <div className="text-center mt-8">Company not found</div>;
    }

    const handleLogoClick = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                await uploadLogo(file, companyId);
            }
        };
        input.click();
    };

    return (
        <div className=" container max-w-3xl mx-auto px-4 py-8 ">
            <div className="flex items-center justify-center">
                {isOwner ? (
                    <img
                        src={selectedCompany.logo}
                        alt="Company Logo"
                        className="w-24 h-24 rounded-full cursor-pointer"
                        onClick={handleLogoClick}
                    />
                ) : (
                    <img
                        src={selectedCompany.logo}
                        alt="Company Logo"
                        className="w-24 h-24 rounded-full"
                    />
                )}
            </div>
            <h1 className="text-3xl font-semibold mt-4">{selectedCompany.name}</h1>
            <p className="text-lg text-gray-600 mt-2">Location: {selectedCompany.location}</p>
            <p className="text-lg text-gray-600 mt-2">Description: {selectedCompany.description}</p>

            {isOwner && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Manage Company</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company
                                Name</label>
                            <input type="text" id="name" name="name"
                                   className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location"
                                   className="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" id="location" name="location"
                                   className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description"
                                   className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="description" name="description" rows="4"
                                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                        </div>
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-4">Update
                            Company
                        </button>
                    </form>

                    <button className="text-xl font-semibold mt-8 mb-4" onClick={handleCreateEventClick}>Create Event</button>
                    <CreateEventModal isOpen={isCreateEventModalOpen} onClose={handleCloseModal} companyId={companyId}/>

                </div>
            )}
        </div>
    );
};

export default CompanyPage;