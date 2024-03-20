import React from "react";
import { Card, Typography, CardContent } from "@mui/material";
import ShimmerLoading from "./ShimmerLoading";

const ShortsListingLoading = () => {


    return (
        <>
            {/* Placeholder for related videos */}
            {[...Array(5)].map((_, index) => (
                <div className='col-12 shimmer-loading-list' key={index}>
                    <div className='video-box-single-v with-action' >

                        <Card className='shorts-card shadow-none'>
                            <div className='video-box cursor-pointer'>
                                    <ShimmerLoading height="390px" width="100%" />
                            </div>
                        </Card>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShortsListingLoading;
