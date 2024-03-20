import React from "react";
import { Card, CardContent } from "@mui/material";
import ShimmerLoading from "./ShimmerLoading";

const RelatedVideoLoading = () => {


    return (
        <>
            {/* Placeholder for related videos */}
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
        </>
    );
};

export default RelatedVideoLoading;
