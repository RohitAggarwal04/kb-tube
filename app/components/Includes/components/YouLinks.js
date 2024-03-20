import React from "react";
import Link from 'next/link';
import {  AccountBoxOutlined } from "@mui/icons-material";

export const YouLinks = ({ userData, channel }) => {

    return <div className="popular__events__head">
        <h5>You <span className="bi bi-chevron-right"></span></h5>
        <ul>
            {!userData ?
                <li>
                    <Link
                        href="#"
                        // href="URL:void(0)"
                        data-bs-toggle="modal"
                        data-bs-target="#signInPin" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                        <span className="me-3 bi bi-person-circle"></span>
                        <span>Sign in</span>
                    </Link>
                </li>
                :
                <li>
                    {channel == true && (
                        <Link href="/channel" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                            <span className="me-3 bi">
                                <AccountBoxOutlined />
                            </span>
                            <span>Your Channel</span>
                        </Link>
                    )}
                    {channel == false && (
                        <Link href="/create-channel" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                            <span className="me-3 bi bi-film"></span>
                            <span>Create Channel</span>
                        </Link>

                    )}
                </li>
            }
        </ul>
    </div>
}