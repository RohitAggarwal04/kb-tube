// pages/404.js
import React from 'react';

export default function Custom404() {
    return (
        <div className="container-fluid my-5 bg-dark text-white">
            <div className="text-center py-5">
                <h1 className="display-1">404</h1>
                <p className="lead text-center">This page isn't available. Sorry about that.</p>
                <p className="lead text-center mb-4">Try searching for something else.</p>
                <Link href="/" className="btn btn-warning">Go to Home</Link>
            </div>
        </div>
    );
};
