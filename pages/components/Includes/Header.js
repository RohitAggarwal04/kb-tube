'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import UploadVideo from '../Functions/UploadVideo';
import ForgotModal from "../modals/ForgotModal";
import LoginModal from "../modals/LoginModal";
import SignUpModal from "../modals/SignUpModal";
import { LogoLink } from './components/LogoLink';
import { NavSideMenu, SideMenu } from './components/NavSideMenu';

function Header({ token, channel, profileData }) {



    const [description, setDescription] = useState('');

    const router = useRouter();

    const handleFileChanges = async (event) => {
        const value = event.target.value;
        setDescription(value);
        localStorage.setItem('searchkey', value);
    }

    const searchVideo = async () => {
        //navigate('./');
        window.location.href = './';
    };


    return (
        <>
            <header className="header-section py-1 py-lg-3">
                <div className="container-fluid">
                    <div className="row header-wrapper align-items-center justify-content-between">
                        <div className='col-lg-2 col-4 d-flex'>
                            <NavSideMenu />
                            <LogoLink />


                        </div>

                        <Topbar token={token} channel={channel} profileData={profileData} />



                        <div className='col-lg-6'>
                            <div className="search-bar">
                                <input
                                    type="search"
                                    placeholder="Search"
                                    value={description}
                                    onChange={handleFileChanges}
                                />
                                <button onClick={() => searchVideo()}>
                                    <i className="bi bi-search"></i>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* sidebar header start */}
                <div className="offcanvas offcanvas-start px-0" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: '256px' }}>
                    <div className='d-flex ms-3'>
                        <Link href="#" className='me-3 secondary-color font-lg' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            <i className="bi bi-list"></i>
                        </Link>
                        <Link href="/" className="d-flex align-items-center mb-lg-0  text-decoration-none">
                            <img src='/images/logo.png' alt='log' width={100} />
                        </Link>
                    </div>

                    <div className="offcanvas-body overflow-y-sm p-0">
                        {/* <Sidebar /> */}
                    </div>

                </div>
                {/* sidebar header end */}

            </header>

            {/* <UploadVideo /> */}

            {/* Login Modal */}
            {/* <LoginModal />
            <SignUpModal />
            <ForgotModal /> */}



        </>
    )
};
export default Header
