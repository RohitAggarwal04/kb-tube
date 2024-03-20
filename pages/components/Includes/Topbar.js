'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { VideoCall } from '@mui/icons-material'; // Import the moon and sun icons

function Topbar({ token, channel, profileData }) {
    const [firstLetter, setFirstLetter] = useState(null);

    useEffect(() => {
        // setFirstLetter(response.data.data.full_name ? response.data.data.full_name.charAt(0) : null);
    }, []);

    return (

        <>
            <div className='col-lg-4 col-8 order-lg-2 d-flex align-items-center justify-content-end'>
                {/*<div className='d-flex align-items-center justify-content-end'>
                    <FormControlLabel
                        control={<Switch checked={theme === 'dark'} onChange={toggleTheme} />}
                        label={theme === 'dark' ? <i className="bi secondary-color"><Brightness4 /></i> : <i className="bi secondary-color"><Brightness7 /></i>} // Render moon or sun icon based on theme
                    />
    </div>*/}
                {
                    token ?
                        <div className='d-flex align-items-center justify-content-end'>
                            <div className="me-lg-4 me-2">
                                <a href="#" className="navbtn-ico  caret-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" title='Create'>
                                    <i className="bi secondary-color"><VideoCall /></i>
                                </a>
                                <ul className="dropdown-menu">

                                    {chanenl == true ? (
                                        <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#videoUpload"> Upload Video</a></li>
                                    ) : (
                                        <Link href="./create-channel" className="dropdown-item">Create Chanel</Link>
                                    )}
                                    {/* <li><a className="dropdown-item" href="#">Go Live</a></li> */}
                                </ul>
                            </div>
                            {/* <div className="dropdown text-end me-4 ">
                            <Link href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className='bi bi-bell secondary-color'></i>
                            </Link>

                              </div>*/}

                            <div className="dropdown text-end">
                                <a href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                    {profiledata.photo && profiledata.photo !== "N/A" ? (
                                        <img src={profiledata.photo} alt="mdo" width="45" height="45" className="rounded-circle" />
                                    ) : (

                                        <div
                                            className='profile-ico'
                                        >
                                            {fl ? fl : ''}

                                        </div>



                                    )}
                                </a>
                                <ul className="dropdown-menu ">

                                    <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <Link href="/signout" className="dropdown-item" >Sign out</Link>
                                </ul>
                            </div>
                        </div>

                        :

                        <div className="mneu-btn-grp">
                            {/* <Link href="/login" className='text-decoration-none secondary-color '>
                                <div className="text-end me-lg-4 me-2">
                                    <div className="d-block caret-none" >
                                        <img src={profile} alt="mdo" width="32" height="32" className="rounded-circle" /> Sign in
                                    </div>
                                </div>
                            </Link> */}

                            <Link
                                className="cmn--btn"
                                href="URL:void(0)"
                                data-bs-toggle="modal"
                                data-bs-target="#signInPin"
                            >
                                <span>Sign In</span>
                            </Link>
                            <Link
                                href="URL:void(0)"
                                className="cmn--btn2"
                                data-bs-toggle="modal"
                                data-bs-target="#signUpPin"
                            >
                                <span className="rela">Sign Up</span>
                            </Link>
                        </div>
                }
            </div>
        </>
    )
}

export default Topbar