import React from 'react';
import {useNavigate} from "react-router-dom";

const CompanyItem = ({ company }) => {
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate(`/company/${company.id}`);
    };

    return (
        <li className="border border-gray-300 rounded-md p-2 mb-2">
            <h3 className="font-semibold">{company.name}</h3>
            <p className="text-gray-600">{company.description}</p>
            <p className="text-sm text-gray-500">{company.location}</p>
            <button onClick={handleVisitClick}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Go
            </button>
        </li>
    );
};

export default CompanyItem;
