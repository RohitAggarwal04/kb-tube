import React from "react";
import { Card, CardContent } from "@mui/material";
import ShimmerLoading from "./ShimmerLoading";

const WatchSingleLoading = () => {


    return (
        <div className="container-fluid mt-3 px-lg-4">
            <div className="row">
                <div className="col-md-8">
                    <div className="watch-video-comment-box">
                        <div className="video-box-single-v">
                            <Card className="shadow-none overflow-visible">
                                <div className="video-box">
                                    {/* Shimmer loading for video */}
                                    <ShimmerLoading height="400px" width="100%" />
                                </div>
                                <div className="watch-active-metadata style-scope ytd-watch-flexy style-scope ytd-watch-flexy">
                                    <div id="info" className="style-scope ytd-watch-flexy">
                                        <div id="info-skeleton" className="watch-skeleton style-scope ytd-watch-flexy">
                                            <div id="primary-info" className="skeleton-light-border-bottom">
                                                <div id="title" className="text-shell skeleton-bg-color"></div>
                                                <div id="info">
                                                    <div id="count" className="text-shell skeleton-bg-color"></div>
                                                    <div className="flex-1"></div><div id="menu">
                                                        <div className="menu-button skeleton-bg-color"></div>
                                                        <div className="menu-button skeleton-bg-color"></div>
                                                        <div className="menu-button skeleton-bg-color"></div>
                                                        <div className="menu-button skeleton-bg-color"></div>
                                                        <div className="menu-button skeleton-bg-color"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="info-contents" className="style-scope ytd-watch-flexy"></div>
                                    </div>
                                    <div id="meta" className="style-scope ytd-watch-flexy">
                                        <div id="meta-skeleton" className="watch-skeleton style-scope ytd-watch-flexy">
                                            <div id="secondary-info" className="skeleton-light-border-bottom">
                                                <div id="top-row"><div id="video-owner" className="flex-1">
                                                    <div id="channel-icon" className="skeleton-bg-color"></div>
                                                    <div id="upload-info" className="flex-1">
                                                        <div id="owner-name" className="text-shell skeleton-bg-color"></div>
                                                        <div id="published-date" className="text-shell skeleton-bg-color"></div>
                                                    </div>
                                                </div>
                                                    <div id="subscribe-button" className="skeleton-bg-color"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="meta-contents" className="style-scope ytd-watch-flexy"></div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    {/* Shimmer loading for comments */}
                    <div className="comment-box-main my-3">
                        <Card className="p-3">
                            <ShimmerLoading height="25px" width="30%" />
                            {/* Placeholder for adding comment */}
                            <div className="d-flex align-items-center">
                                <ShimmerLoading height="45px" width="45px" />
                                <div className="form-floating w-100">
                                    <ShimmerLoading height="45px" width="100%" />
                                </div>
                            </div>
                            {/* Placeholder for comment list */}
                            <div className="comments-list">
                                {[...Array(5)].map((_, index) => (
                                    <div className="single-comment-li" key={index}>
                                        {/* Shimmer loading for commenter thumbnail */}

                                        <div className="w-100">
                                            <div id="meta" style={{ height: "auto" }} className="style-scope ytd-watch-flexy">
                                                <div id="meta-skeleton" className="watch-skeleton style-scope ytd-watch-flexy">
                                                    <div id="secondary-info" style={{ padding: "0px" }} className="skeleton-light-border-bottom">
                                                        <div id="top-row">
                                                            <div id="video-owner" className="flex-1">
                                                                <div id="channel-icon" className="skeleton-bg-color"></div>
                                                                <div id="upload-info" className="flex-1">
                                                                    <div id="owner-name" className="text-shell skeleton-bg-color"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="meta-contents" className="style-scope ytd-watch-flexy">
                                                            <br />
                                                            {/* Shimmer loading for commenter name */}
                                                            <ShimmerLoading height="20px" width="50%" />
                                                            {/* Shimmer loading for comment */}
                                                            <ShimmerLoading height="20px" width="100%" />
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
                {/* Placeholder for related videos */}
                <div className="col-md-4">
                    {[...Array(4)].map((_, index) => (
                        <div className="video-box-single-h" key={index}>
                            <Card>
                                <CardContent>
                                    <div className="row g-2">
                                        {/* Shimmer loading for video thumbnail */}
                                        <div className="col-5">
                                            <ShimmerLoading height="120px" width="100%" />
                                        </div>
                                        {/* Shimmer loading for video title and metadata */}
                                        <div className="col-7">
                                            <ShimmerLoading height="20px" width="100%" />
                                            <ShimmerLoading height="20px" width="80%" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchSingleLoading;
