import React from "react";
import { Card, Typography, CardContent } from "@mui/material";
import ShimmerLoading from "./ShimmerLoading";

const ShortsPageLoading = () => {


    return (
        <>
            {/* Placeholder for related videos */}
            {[...Array(5)].map((_, index) => (
                <div key={index} className='kbt-shorts-video-item'>
                    <div className='kbt-shorts-video-item-container'>
                        <div className='kbt-player-wrapper'>
                            <div className='player-container'>
                                <Card className='shorts-card1 shadow-none'>
                                    <div className='video-box'>
                                        <div className='video-box'>
                                            <ShimmerLoading height="100vh" width="100vw" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShortsPageLoading;
