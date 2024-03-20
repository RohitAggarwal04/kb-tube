import Footer from '@/app/components/Includes/Footer';
import Header from '@/app/components/Includes/Header';
import Sidebar from '@/app/components/Includes/Sidebar';
import React, { useEffect, useState } from 'react';

const AppLayout = ({ children, withoutSideBar }) => {
    const [token, setToken] = useState(null);
    const [channel, setChannel] = useState(false);
    const [profileData, setProfile] = useState([]);


    const getToken = async () => {
        try {
            const response = await axios.get(`/api/fetchToken`, {});
            const auth_token = response.data
            setToken(auth_token);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const getChannel = async () => {
        try {
            const response_x = await axios.get(`/api/fetchMyChannel`, {});
            const response = response_x.data
            if (response && response.status === 1) { // Check status directly from response
                setChannel(true);
            }
        } catch (error) {
            console.error('Error fetching Channel client:', error);
        }
    };


    const getUser = async () => {
        try {
            const response_x = await axios.get(`/api/fetchUserData`, {});
            const response = response_x.data
            if (response.data && response.data.status === 1) {
                setProfile(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
        }
    };

    useEffect(() => {
        getChannel();
        getToken();
        getUser();

    }, []);


    return (
        <div className="left__site__section">
            <Header token={token} channel={channel} profileData={profileData} />
            <div className="popular__events__body">
                <div className="container-fluid p-0">
                    {
                        withoutSideBar ?
                            <div className="row g-0">
                                <div className="col-xxl-12">
                                    {children}
                                </div>
                            </div>
                            :
                            <div className="row g-0">
                                <div className="col-xxl-2 col-xl-3 col-lg-3 display991">
                                    <Sidebar token={token} channel={channel} profileData={profileData} />
                                </div>
                                <div className="col-xxl-10 col-xl-9 col-lg-9">
                                    {children}
                                </div>
                            </div>
                    }

                </div>
            </div>
            <Footer token={token} channel={channel} profileData={profileData} />
        </div>
    );
};

export default AppLayout;