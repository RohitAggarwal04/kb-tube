import React from "react";
import Link from 'next/link';
import {  Whatshot } from "@mui/icons-material";

export const ExploreLinks = () => {

    return <div className="popular__events__head">
        <h5>Explore</h5>
        <ul>
            <li>
                <Link href="/trending" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                    <span className='me-3 bi'>
                        <Whatshot />
                    </span>
                    <span className='sidebar-title'> Trending </span>
                </Link>
            </li>

        </ul>
    </div>
}