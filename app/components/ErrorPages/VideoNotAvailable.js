import React from "react";
import "@/public/css/VideoNotAvailable.css";
import unavailable_video from "@/public/images/unavailable_video.png";
import Link from "next/link";

const VideoNotAvailable = () => {
  return (
    <div className="video-not-available">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img
              src={unavailable_video}
              alt="This video isn't available anymore"
              className="img-fluid"
            />
          </div>
          <div className="col-12">
            <h1>This video isn't available anymore.</h1>
            <Link href="/" className="btn btn-go-home">
              GO TO HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoNotAvailable;
