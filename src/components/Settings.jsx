import React, { useEffect, useState } from 'react';
import { useAuthStore, useCompaniesStore } from "../store/index.js";
import CreateCompanyModal from "./company/CreateCompanyModal.jsx";
import CompanyItem from "./company/CompanyItem.jsx";
import { Center, 
    Box, 
    Input, 
    Button, 
    Heading, 
    Text, 
    AlertDialog, 
    AlertDialogOverlay, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogBody, 
    AlertDialogFooter, 
    Tab, 
    TabList, 
    TabPanel, 
    TabPanels } from '@chakra-ui/react';

function Settings() {
    const { logoutUser, uploadAvatar, updateUser, deleteUser, user } = useAuthStore();
    const { fetchUserCompanies, userCompanies } = useCompaniesStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

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

    const handleDeleteAccount = async () => {
        setIsDeleteAlertOpen(true);
    };

    const confirmDeleteAccount = async () => {
        //await deleteUser();
        // Після видалення облікового запису перенаправити користувача на сторінку виходу
        //await logoutUser();
    };

    const handleCloseDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
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

       /*
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
    */


    return (
        <Center minH="100vh">
            <Box
                w="60%"
                h="100vh"
                bg="#49AA87"
                boxShadow="lg"
                p="4"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    w='50%'
                    h='60vh'
                    borderRadius='1rem'
                    p={10}
                    backgroundColor='#E2E8F0'
                    textAlign="center"
                    marginLeft="5%"
                >
                    <Text fontSize={24} mb={4}>What do you want to change?</Text>
                    <Input placeholder='Name' type='text' borderColor='black' mb={4} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <Input placeholder='Surname' type='text' borderColor='black' mb={4} value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    <Input placeholder='Email' type='text' borderColor='black' mb={4} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder='Password' type='password' borderColor='black' mb={4}/>
                    {/* value={password} onChange={(e) => setPassword(e.target.value)} */}
                    <Button type='button' color='#49AA87' onClick={handleUpdateUser} margin={4}>Save changes</Button>
                    <Button type='button' color='red' onClick={handleLogout} margin={4}>Logout</Button>
                    <Button type='button' color='red' onClick={handleDeleteAccount} margin={4}>Delete account</Button>

                    <AlertDialog
                        isOpen={isDeleteAlertOpen}
                        onClose={handleCloseDeleteAlert}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                    Delete Account
                                </AlertDialogHeader>
                                <AlertDialogBody>
                                    Are you sure that you want to delete your account? This action cannot be undone.
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button onClick={handleCloseDeleteAlert}>
                                        Cancel
                                     </Button>
                                    <Button colorScheme="red" onClick={confirmDeleteAccount} ml={3}>
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>

                    <Button type='button' color='blue' margin={4}>Create Company</Button>
                </Box>

                <Box
                    w='40%'
                    h='60vh'
                    borderRadius='1rem'
                    p={10}
                    backgroundColor='#E2E8F0'
                    textAlign="center"
                    margin="5%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Heading>Info</Heading>
                    <div
                        onClick={handleAvatarClick}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            marginBottom: '16px'
                        }}
                    >
                        <img
                            src={getUserAvatar()}
                            alt="User Avatar"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    <Text>Name: {user.firstName}</Text>
                    <Text>Surname: {user.surname}</Text>
                    <Text>Email: {user.email}</Text>
                </Box>
            </Box>
        </Center>
    );
}

export default Settings;
