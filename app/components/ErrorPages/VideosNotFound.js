import React from "react";
import Link from 'next/link';

import "@/public/css/VideoNotAvailable.css";

const VideosNotFound = () => {
    return (
        <div className="video-not-available">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img src='/images/unavailable_video.png' alt="There is no video available" className="img-fluid" />
                    </div>
                    <div className="col-12">
                        <h1>There is no video available.</h1>
                        <Link href="/" className="btn btn-go-home">HOME</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VideosNotFound;