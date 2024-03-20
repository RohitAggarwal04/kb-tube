import React from "react";
import Link from 'next/link';

export const LogoLink = () => {

    return <Link href="/" className="d-flex align-items-center mb-lg-0  text-decoration-none">
    <img src='/images/logo.png' alt='log' width={100} />
</Link>
}