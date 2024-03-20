// components/Layout.js

import React, { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Footer from '@/app/components/Includes/Footer';
import Header from '@/app/components/Includes/Header';
import Sidebar from '@/app/components/Includes/Sidebar';
import axios from 'axios';


const Layout = ({ children, withoutSideBar }) => {
    const { token, channel, profileData, login, logout  } = useContext(AuthContext);

    const updateLogin = async () => {
        try {

            const responseData = await axios.get('/api/fetchToken');
            if (responseData && responseData.data){

                login(responseData.data.data.user.token, responseData.data.data.user);
                console.log("response: ", responseData);
                console.log("response2: ", responseData.data);
                console.log("response3: ", responseData.data.data);
                console.log("response4: ", responseData.data.data.user);
            }

        } catch (error) {

            console.log("error: ", error);
        }
    };

    useEffect( () => {
        updateLogin();
    },[]);

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
            <Footer />
        </div>
       
    );
};

export default Layout;
