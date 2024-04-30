import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useCompaniesStore} from "../../store/index.js";
import CreateEventModal from "../event/CreateEventModal.jsx";
import useEventsStore from "../../store/events.js";
import EventItem from "../event/EventItem.jsx";

const CompanyPage = () => {
    const { companyId } = useParams();
    const { companies, userCompanies, uploadLogo } = useCompaniesStore();
    const { getEventsByCompanyId } = useEventsStore();
    const events = getEventsByCompanyId(companyId);
    const selectedCompany = companies.find(company => company.id === parseInt(companyId));
    const isOwner = userCompanies.some(company => company.id === parseInt(companyId));


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

                    <CreateEventModal companyId={companyId}/>

                </div>
            )}
            <div>
                <h2 className="text-3xl font-bold mb-4">Company`s events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-3">
                    {events.map(event => (
                        <div key={event.id} className="p-4">
                            <EventItem key={event.id} event={event}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;