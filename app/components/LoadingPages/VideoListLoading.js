import React from "react";
import { Card, CardContent } from "@mui/material";
import ShimmerLoading from "./ShimmerLoading";

const VideoListLoading = () => {


    return (
        <>
            {/* Placeholder for related videos */}
            {[...Array(8)].map((_, index) => (
                <div className='col shimmer-loading-list' key={index}>
                    <div className='video-box-single-v with-action' >

                        <Card className='shadow-none h-194-video'>
                            <div className='video-box cursor-pointer'>
                                <div>
                                    <ShimmerLoading height="220px" width="100%" />
                                </div>
                            </div>
                            <CardContent>
                                <div className="watch-active-metadata style-scope ytd-watch-flexy style-scope ytd-watch-flexy">
                                    <div id="meta" className="style-scope ytd-watch-flexy">
                                        <div id="meta-skeleton" className="watch-skeleton style-scope ytd-watch-flexy">
                                            <div id="secondary-info" className="skeleton-light-border-bottom">
                                                <div id="top-row"><div id="video-owner" className="flex-1">
                                                    <div id="channel-icon" className="skeleton-bg-color"></div>
                                                    <div id="upload-info" className="flex-1">
                                                        <div id="title" className="text-shell skeleton-bg-color"></div>
                                                        <div id="published-date" className="text-shell skeleton-bg-color"></div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ))}
        </>
    );
};

export default VideoListLoading;
