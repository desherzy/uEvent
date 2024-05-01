import {useEffect, useState} from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import {useAuthStore, useCompaniesStore, useEventsStore} from "./store/index.js";
import Registration from "./components/auth/Registration.jsx";
import Login from "./components/auth/Login.jsx";
import Main from "./components/Main.jsx";
import Settings from "./components/Settings.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Header from "./components/Header.jsx";
import CompaniesList from "./components/company/CompaniesList.jsx";
import CompanyPage from "./components/company/CompanyPage.jsx";
import EventsPage from "./components/event/EventsPage.jsx";
import EventPage from "./components/event/EventPage.jsx";
import { ChakraProvider } from '@chakra-ui/react';
import Image from './assets/background.jpg';
import TicketsPage from "./components/ticket/TicketsPage.jsx";

function App() {
    const { isAuthenticated, emailConfirmed, refreshUser } = useAuthStore();
    const { fetchEvents, fetchCategories } = useEventsStore();
    const { fetchCompanies } = useCompaniesStore();
    const [isCheckingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (localStorage.getItem('token')) {
                    await refreshUser();
                }
                await fetchCompanies();
                await fetchCategories();
                await fetchEvents();
            } catch (error) {
                console.error('Error checking authentication:', error);
            } finally {
                setCheckingAuth(false);
            }
        };

        checkAuth();

    }, [refreshUser]);

    if (isCheckingAuth) {
        return (
            <div> spinner </div>
        );
    }

    if (!emailConfirmed && isAuthenticated) {
        return (
            <div style={{
                backgroundImage: `url(${Image})`,
                backgroundSize: 'cover',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                filter: 'blur(0px)',
              }} display="flex">
              Please confirm email
            </div>
        );
    }


    return (
        <ChakraProvider>
            <BrowserRouter>
                 <Header />
                <Routes>
                    <Route path='/registration' element={<Registration />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Main />} />
                    <Route path='/settings' element={<PrivateRoute> <Settings /> </PrivateRoute>} />
                    <Route path='/companies' element={<CompaniesList />} />
                    <Route path='/tickets' element={<PrivateRoute> <TicketsPage /> </PrivateRoute>} />
                    <Route path='/events' element={<EventsPage />} />
                    <Route path='/events/:eventId' element={<EventPage />} />
                    <Route path='/company/:companyId' element={<CompanyPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App
