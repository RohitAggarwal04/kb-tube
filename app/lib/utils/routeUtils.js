// routeUtils.js

import { ACCESS_KEY, API_URL, LIBRARY_ID, VIDEO_CDN } from "@/app/lib/auth/config";
import { SHARE_LONG, SHARE_SHORTS } from "./ShareUtills";
import { THUMB_SIZE, VIEW_COUNT } from "./VideoUtills";


/*################################################################################*/
/*################################ Configurations ################################*/
/*################################################################################*/
export const libraryID = LIBRARY_ID;
export const AccessKey = ACCESS_KEY;
export const videoCdn = VIDEO_CDN;
export const apiUrl = API_URL;



/*################################################################################*/
/*#################################### Routes ####################################*/
/*################################################################################*/

// Function to generate route paths for videos
export function VideoRoute(uniqId) {
    return `/watch/${uniqId}`;
}

// Function to generate route paths for shorts
export function ShortsRoute(uniqId) {
    return `/shorts/${uniqId}`;
}

// Function to generate route paths for shorts
export function ShortsVideoUrl(videoUrl) {
    const lastPartOfUrl = videoUrl.split('/').pop();
    let dynamic = '720p'; // Default to highest quality
    return `${videoCdn}${lastPartOfUrl}/play_${dynamic}.mp4`;
}

// Function to generate route paths for channels
export function ChannelRoute(channelHandle) {
    return `/@${channelHandle}`;
}


/*################################################################################*/
/*################################# Video Config #################################*/
/*################################################################################*/

// export const thumbnail_size = { width: 2048, height: 1152 }; // for high resolution
export const thumbnail_size = THUMB_SIZE;

export const formatViewsCount = (count) => {
    return VIEW_COUNT(count);
}




/*################################################################################*/
/*################################ Share Function ################################*/
/*################################################################################*/

export const handleShareShort = (uniqId, title, description) => SHARE_SHORTS(uniqId, title, description);
export const handleShareLong = (uniqId, title, description) => SHARE_LONG(uniqId, title, description);