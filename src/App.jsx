import {useEffect, useState} from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import {useAuthStore} from "./store/index.js";
import Registration from "./components/Registration.jsx";
import Login from "./components/Login.jsx";
import Main from "./components/Main.jsx";
import Settings from "./components/Settings.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Header from "./components/Header.jsx";
import CompaniesList from "./components/CompaniesList.jsx";
import CompanyPage from "./components/CompanyPage.jsx";

function App() {
    const { isAuthenticated, emailConfirmed, refreshUser } = useAuthStore();
    const [isCheckingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (localStorage.getItem('token')) {
                    await refreshUser();
                }
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
            <div> Please confirm email </div>
        );
    }


    return (
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/registration' element={<Registration />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Main />} />
                    <Route path='/settings' element={<PrivateRoute> <Settings /> </PrivateRoute>} />
                    <Route path='/companies' element={<CompaniesList />} />
                    <Route path='/company/:companyId' element={<CompanyPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>

    );
}

export default App
