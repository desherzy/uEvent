import React, {useEffect, useState} from 'react';
import {useAuthStore, useCompaniesStore} from "../store/index.js";
import CreateCompanyModal from "./company/CreateCompanyModal.jsx";
import CompanyItem from "./company/CompanyItem.jsx";

function Settings() {
    const { logoutUser, uploadAvatar, updateUser, user } = useAuthStore();
    const { fetchUserCompanies, userCompanies } = useCompaniesStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserCompany = async () => {
            await fetchUserCompanies(user.id);
        };

        fetchUserCompany();
    }, [fetchUserCompanies]);

    const handleUpdateUser = async () => {
        const updatedUser = {
            firstName: firstName,
            surname: surname,
        };
        await updateUser(updatedUser);
    }

    const handleLogout = async () => {
        await logoutUser();
    };

    const handleCreateCompany = async () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAvatarClick = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                await uploadAvatar(file);
            }
        };
        input.click();
    };

    const getUserAvatar = () => {
        return user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    };

    return (
        <div className="flex justify-center h-screen mt-3">
            <div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
                    <div>{user.firstName} {user.surname}</div>
                    <div>{user.email}</div>
                    <div
                        className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                        onClick={handleAvatarClick}
                    >
                        <img
                            src={getUserAvatar()}
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">First Name:</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Surname:</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}
                               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <button onClick={handleUpdateUser}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Save Changes
                    </button>

                </div>
                <button onClick={handleLogout}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-4">Logout
                </button>
                <button onClick={handleCreateCompany}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Create company
                </button>
                <CreateCompanyModal isOpen={isModalOpen} onClose={handleCloseModal}/>

                <div>
                    <h3>My companies</h3>
                    <ul>
                        {userCompanies.map(company => (
                            <CompanyItem key={company.id} company={company}/>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Settings;