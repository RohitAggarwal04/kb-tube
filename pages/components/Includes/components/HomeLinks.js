import React from "react";
import Link from 'next/link';
import { Subscriptions, Home, Tag } from "@mui/icons-material";

export const HomeLinks = ({ userData }) => {

    return <div className="popular__events__head">
    <ul>
        <li>
            <Link href="/" activeclassname="active" className={`nav-link`} aria-current="page" data-bs-dismiss="offcanvas">
                <span className='me-3 bi'>
                    <Home />
                </span>
                <span className='sidebar-title'>Home</span>
            </Link>
        </li>
        <li>
            <Link href="/shorts" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                <span className='me-3 bi'><Tag /></span>
                <span className='sidebar-title'> Shorts </span>
            </Link>
        </li>
        {userData ?
            <li>
                <Link href="/feed/subscriptions" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                    <span className='me-3 bi'>
                        <Subscriptions />
                    </span>
                    <span className='sidebar-title'>Subscriptions</span>
                </Link>
            </li> : null}
    </ul>
</div>
}