import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useAuthStore} from "../store/index.js";


const Header = () => {
    const { isAuthenticated, user } = useAuthStore();


    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img className="h-8 w-auto mr-4" src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-ticket-magic-and-fairy-tale-icongeek26-linear-colour-icongeek26.png" alt="Logo" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-gray-600"
                    />
                </div>
                <nav className="space-x-4">
                    <Link to="/events" className="hover:text-gray-300">Events</Link>
                    <Link to="/companies" className="hover:text-gray-300">Companies</Link>
                    {isAuthenticated ? (
                        <Link to="/tickets" className="hover:text-gray-300">Tickets</Link>
                    ) : null}
                </nav>
                <div className="flex items-center">
                    {isAuthenticated ? (
                        <>
                            <Link to="/settings">
                                <img className="h-8 w-auto mr-4" src={user.profileImage} alt="user" />
                            </Link>
                        </>
                    ) : (
                        <a href="http://localhost:5173/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Login</a>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;