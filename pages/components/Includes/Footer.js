'use client'


import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { HomeOutlined, SubscriptionsOutlined, AddCircleOutline, AccountCircleOutlined, Tag } from '@mui/icons-material';

function Footer({ token }) {
   
    return (
        <>
            <div className='footer-bottom fixed-bottom p-3 d-block d-lg-none'>
                <div className='d-flex gap-3 justify-content-between'>

                    <div>
                        <Link href="/" className="nav-link text-center">
                            <div className='d-flex justify-content-center align-items-center'>
                                <HomeOutlined />
                            </div>
                            <small className=''> Home </small>
                        </Link>
                    </div>
                    <div>
                        <Link href="/shorts" className="nav-link text-center">
                            <div className='d-flex justify-content-center align-items-center'>
                                <Tag />
                            </div>
                            <small className=''> shorts </small>
                        </Link>
                    </div>
                    {
                        token ?

                            <div>
                                <Link href="/" className="nav-link text-center" data-bs-toggle="modal" data-bs-target="#videoUpload">
                                    <div className='d-flex justify-content-center align-items-center'><AddCircleOutline /></div>
                                    <small className=''> Add </small>
                                </Link>
                            </div>
                            : null}
                    {
                        token ?
                            <div>
                                <Link href="/" className="nav-link text-center">

                                    <div className='d-flex justify-content-center align-items-center'><SubscriptionsOutlined /></div>
                                    <small className=''> subscribtions </small>
                                </Link>
                            </div>
                            : null}
                    {
                        token ?
                            <div>
                                <Link href="/profile" className="nav-link text-center">
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <AccountCircleOutlined />
                                    </div>
                                    <small className=''> you </small>
                                </Link>
                            </div>
                            :
                            <div>
                                <Link
                                    href="URL:void(0)"
                                    data-bs-toggle="modal"
                                    data-bs-target="#signInPin" className="nav-link text-center">
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <AccountCircleOutlined />
                                    </div>
                                    <small className=''> Login </small>
                                </Link>
                            </div>
                    }
                </div>
            </div>
        </>
    )
};
export default Footer
