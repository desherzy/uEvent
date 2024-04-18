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
            <button onClick={handleVisitClick}>Go</button>
        </li>
    );
};

export default CompanyItem;
