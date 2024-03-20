import React from "react";

export const NavSideMenu = () => {

    return <>

        {/* Commented dev side */}
        {/* <Link href="#" className='me-3 d-none d-lg-inline-block' >
                               <i className="bi bi-list secondary-color font-lg"  ></i>
                            </Link> */}
        {/* Commented dev side */}
        <a href="#" className='me-lg-3 me-1 d-inline-block d-lg-none' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i className="bi bi-list secondary-color font-lg"></i>
        </a>
    </>
}