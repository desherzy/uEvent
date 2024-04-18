import React, {useEffect, useState} from 'react';
import {useCompaniesStore} from "../store/index.js";
import CompanyItem from "./CompanyItem.jsx";


const CompaniesList = () => {
    const { companies, fetchCompanies } = useCompaniesStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCompanies();
                setLoading(false);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchData();
    }, [fetchCompanies]);

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-md">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul className="mt-3">
                    <h2 className="text-xl font-semibold mb-4">Companies List</h2>
                    {companies.map(company => (
                        <CompanyItem key={company.id} company={company}/>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
};

export default CompaniesList;