// ShimmerLoading.js

import React from "react";
import "./ShimmerLoading.css";

const ShimmerLoading = ({ height, width, borderRadius = null }) => {
    return <div className="shimmer-loading" style={{ height, width, borderRadius }} />;
};

export default ShimmerLoading;
