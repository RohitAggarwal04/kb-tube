import React from "react";
import Link from 'next/link';

export const StaticPageLinks = () => {

    return <div className="popular__events__head">
        <ul>
            <li>
                <Link href="/disclaimer" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                    <span className='sidebar-title'> Disclaimer </span>
                </Link>
            </li>
            <li>
                <Link href="/about" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                    <span className='sidebar-title'> About </span>
                </Link>
            </li>
            <li>
                <Link href="/contact-us" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                    <span className='sidebar-title'> Contact Us </span>
                </Link>
            </li>
            <li>
                <Link href="/privacy-policy" activeclassname="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                    <span className='sidebar-title'> Privacy Policy </span>
                </Link>
            </li>

        </ul>
    </div>
}